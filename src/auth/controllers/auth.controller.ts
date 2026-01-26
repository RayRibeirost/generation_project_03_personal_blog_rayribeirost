import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { UserLogin } from '../entities/userlogin.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Usuario')
@Controller('/usuarios')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/logar')
  login(@Body() user: UserLogin): Promise<any> {
    return this.authService.login(user);
  }
}
