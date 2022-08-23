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
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll(@Query() query) {
    console.log(query);
    const data = await this.userService.findAll();
    const meta = { lastId: query?.lastId || null };
    return baseResponseList(data, { meta });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    return baseResponseCreate(await this.userService.create(createUserDto));
  }

  @Get(':id')
  async findOne(@Param('id', UuidPipe) id: string) {
    return baseResponseRead(await this.userService.getById(id));
  }

  @Patch(':id')
  async update(
    @Param('id', UuidPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return baseResponseUpdate(await this.userService.update(id, updateUserDto));
  }

  @Delete(':id')
  async remove(@Param('id', UuidPipe) id: string) {
    return baseResponseDelete(await this.userService.remove(id));
  }
}
