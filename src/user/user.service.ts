import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ id: id });

    if (user) {
      return user;
    } else {
      throw new NotFoundException('User with this ID does not exist');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id: id });

    if (!user) {
      throw new NotFoundException('User with this ID does not exist');
    } else {
      if (user.password === updateUserDto.oldPassword) {
        await this.usersRepository.update(id, {
          password: updateUserDto.newPassword,
        });
        return user;
      } else {
        throw new ForbiddenException('oldPassword is wrong');
      }
    }
  }

  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.delete(id);

    if (user.affected) {
      throw new HttpException('Deleted', 204);
    } else {
      throw new NotFoundException('User with this ID does not exist');
    }
  }
}
