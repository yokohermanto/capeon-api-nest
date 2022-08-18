import {
  RecordNotFoundException,
  RecordNotFoundToDeleteException,
  RecordNotFoundToUpdateException,
} from './../exceptions/not-found.exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const data = await this.userRepository.create(createUserDto);
    await this.userRepository.save(data);
    return data;
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
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
