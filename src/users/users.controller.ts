import {
  baseResponseCreate,
  baseResponseDelete,
  baseResponseList,
  baseResponseRead,
  baseResponseUpdate,
} from './../utils/helpers';
import { UuidPipe } from './../utils/pipes/uuid.pipe';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    return baseResponseCreate(await this.usersService.create(createUserDto));
  }

  @Get()
  async findAll() {
    return baseResponseList(await this.usersService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id', UuidPipe) id: string) {
    return baseResponseRead(await this.usersService.getById(id));
  }

  @Patch(':id')
  async update(
    @Param('id', UuidPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return baseResponseUpdate(
      await this.usersService.update(id, updateUserDto),
    );
  }

  @Delete(':id')
  async remove(@Param('id', UuidPipe) id: string) {
    return baseResponseDelete(await this.usersService.remove(id));
  }
}
