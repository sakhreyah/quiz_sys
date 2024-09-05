import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<User> {
    if (!id) {
      return null;
    }
    return this.usersRepository.findOneBy({ id });
  }

  async find(email: string): Promise<User[]> {
    return this.usersRepository.find({ where: { email } });
  }

  // async findAll(): Promise<User[]> {
  //   return this.usersRepository.find();
  // }

  async create(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const user = this.usersRepository.create({
      username,
      email,
      password,
    });
    return this.usersRepository.save(user);
  }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.usersRepository.remove(user);
  }
}
