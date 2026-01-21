import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private bcrypt: Bcrypt,
  ) {}
  async findAllUsers(): Promise<Users[]> {
    return this.usersRepository.find();
  }
  async findUserById(id: number): Promise<Users> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    return user;
  }
  async findUserByEmail(email: string): Promise<Users | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }
  async createUser(user: Users): Promise<Users> {
    const searchUser = await this.findUserByEmail(user.email);
    if (searchUser)
      throw new HttpException('O usuário já existe!', HttpStatus.BAD_REQUEST);
    user.password = await this.bcrypt.encodePassword(user.password);
    return await this.usersRepository.save(user);
  }
  async updateUser(user: Users): Promise<Users> {
    await this.findUserById(user.id);
    const searchUser = await this.findUserByEmail(user.email);
    if (searchUser && searchUser.id !== user.id)
      throw new HttpException('Email já cadastrado!', HttpStatus.BAD_REQUEST);
    user.password = await this.bcrypt.encodePassword(user.password);
    return await this.usersRepository.save(user);
  }
}
