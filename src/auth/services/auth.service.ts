import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { Bcrypt } from '../bcrypt/bcrypt';
import { UserLogin } from '../entities/userlogin.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private bycript: Bcrypt,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const searchUser = await this.userService.findUserByEmail(username);
    if (!searchUser)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    const matchPassword = await this.bycript.comparePasswords(
      password,
      searchUser.password,
    );
    if (searchUser && matchPassword) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...response } = searchUser;
      return response;
    }
    return null;
  }
  async login(userLogin: UserLogin) {
    const payload = { sub: userLogin.user };
    const searchUser = await this.userService.findUserByEmail(userLogin.user);
    return {
      id: searchUser?.id,
      username: searchUser?.username,
      email: searchUser?.email,
      password: '',
      photo: searchUser?.photo,
      token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }
}
