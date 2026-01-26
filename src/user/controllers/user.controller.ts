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
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Users } from '../entities/user.entity';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuario')
@Controller('/usuarios')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  @HttpCode(HttpStatus.OK)
  findAllUsers(): Promise<Users[]> {
    return this.userService.findAllUsers();
  }
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Put('/atualizar')
  @HttpCode(HttpStatus.OK)
  async updateUser(@Body() user: Users): Promise<Users> {
    return this.userService.updateUser(user);
  }
}
