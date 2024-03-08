import {
  BadRequestException,
  Injectable,
  ForbiddenException,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  createUserInBd,
  getAllUsersFromBd,
  getUsersByIdFromBd,
  updateUserByIdFromBd,
  deleteUsersByIdFromBd,
} from 'src/db/user.db';
import { validate } from 'uuid';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    return await createUserInBd(createUserDto);
  }

  findAll() {
    const allUsers = getAllUsersFromBd();
    return allUsers;
  }

  async findOne(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const user = await getUsersByIdFromBd(id);

    if (user) {
      return user;
    } else {
      throw new NotFoundException('User with this ID does not exist');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const user = await updateUserByIdFromBd(id);

    if (!user) {
      throw new NotFoundException('User with this ID does not exist');
    } else {
      if (user.password === updateUserDto.oldPassword) {
        user.password = updateUserDto.newPassword;
        user.version = user.version += 1;
        user.updatedAt = Date.now();
        return user;
      } else {
        throw new ForbiddenException('oldPassword is wrong');
      }
    }
  }

  async remove(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const user = await deleteUsersByIdFromBd(id);

    if (user) {
      throw new HttpException('Forbidden', 204);
    } else {
      throw new NotFoundException('User with this ID does not exist');
    }
  }
}
