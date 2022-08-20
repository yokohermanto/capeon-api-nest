import { InternalServerErrorException } from '../utils/exceptions/internal-server-error.exceptions';
import {
  RecordNotFoundException,
  RecordNotFoundToDeleteException,
  RecordNotFoundToUpdateException,
} from '../utils/exceptions/not-found.exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import POSTGRES_ERROR_CODE from 'src/database/postgres-error-code.enum';
import { AlreadyExistException } from 'src/utils/exceptions/already-exist.exceptions';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(createUserDto.password, salt);

      const data = await this.userRepository.create({
        ...createUserDto,
        password: hash,
      });
      await this.userRepository.save(data);
      return data;
    } catch (error: any) {
      if (error?.code === POSTGRES_ERROR_CODE.UNIQUE_VALIDATION) {
        throw new AlreadyExistException('email');
      }
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  async getById(id: string) {
    const data = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (data) {
      return data;
    }
    throw new RecordNotFoundException();
  }

  async getByEmail(email: string) {
    const data = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (data) {
      return data;
    }
    throw new RecordNotFoundException();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    const updated = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (updated) {
      return updated;
    }
    throw new RecordNotFoundToUpdateException();
  }

  async remove(id: string) {
    const deleted = await this.userRepository.delete(id);
    if (!deleted.affected) {
      throw new RecordNotFoundToDeleteException();
    }
  }
}
