import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { BaseCrudService } from "../services/base.crud.service";
import { PatchEmailDTO } from './dto/patch-email-dto';
import { User } from "./entities/user.entity";
import { HttpExceptionsFilter } from "./exception-filter/exception-filter";
import { CreateUserGuard } from './guards/create-user-guard';
import { GetAllInterceptor } from './interceptors/get-all-interceptor';
import { UsersService } from './users.service';

@Controller('users')
@UseFilters(new HttpExceptionsFilter())
export class UsersController implements BaseCrudService<User> {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(CreateUserGuard)
  async create<CreateUserDto>(@Body() createUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @UseInterceptors(GetAllInterceptor)
  async findAll(): Promise<Array<User>> {
    return this.usersService.findAllUser();
  }

  @Get(':id')
  async findOne<String>(@Param('id') id): Promise<User> {
    return this.usersService.findUser(+id);
  }

  @Put(':id')
  async update<String, UpdateUserDto>(@Param('id') id, @Body() updateUserDto): Promise<User> {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @Patch(':id')
  async updateEmail(@Param('id') id: string, @Body() payload: PatchEmailDTO): Promise<User> {
    return this.usersService.updateUserEmail(+id, payload.email);
  }

  @Delete(':id')
  async remove<String>(@Param('id') id): Promise<{affected?: number}> {
    return this.usersService.removeUser(+id);
  }
}
