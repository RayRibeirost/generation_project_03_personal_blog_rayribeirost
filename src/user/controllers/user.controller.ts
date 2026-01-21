import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Users } from '../entities/user.entity';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/all')
  @HttpCode(HttpStatus.OK)
  findAllUsers(): Promise<Users[]> {
    return this.userService.findAllUsers();
  }
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findUserById(@Param('id', ParseIntPipe) id: number): Promise<Users> {
    return this.userService.findUserById(id);
  }
  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() user: Users): Promise<Users> {
    return this.userService.createUser(user);
  }
  @Put('/atualizar')
  @HttpCode(HttpStatus.OK)
  async updateUser(@Body() user: Users): Promise<Users> {
    return this.userService.updateUser(user);
  }
}
