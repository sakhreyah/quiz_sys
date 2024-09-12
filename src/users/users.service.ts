import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUser(id: string): Promise<User | null> {
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

  async create(body, user_id): Promise<User> {
    const user = this.usersRepository.create({
      username: body.username,
      email: body.email,
      role: body.role,
      created_by: user_id,
    });

    const salt = await bcrypt.genSalt();

    const hash = await bcrypt.hash(body.password, salt);

    user.password = hash;
    return this.usersRepository.save(user);
  }

  async update(id: string, attrs: Partial<User>, currentUser: User) {
    const user = await this.getUser(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    if (attrs.password) {
      const salt = await bcrypt.genSalt();

      const hash = await bcrypt.hash(attrs.password, salt);

      attrs.password = hash;
    }
    Object.assign(user, attrs);
    user.updated_by = currentUser.id;
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<User> {
    const user = await this.getUser(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.usersRepository.remove(user);
  }
}
