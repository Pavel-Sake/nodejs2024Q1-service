import { Injectable } from '@nestjs/common';
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

function getStatusAndMessage(message, status) {
  const response = {
    message: message,
    status: status,
  };
  return response;
}

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
      return getStatusAndMessage('ID is not valid', 400);
    }
    const user = await getUsersByIdFromBd(id);

    if (user) {
      return getStatusAndMessage(user, 200);
    } else {
      return getStatusAndMessage('User with thi ID does not exist', 404);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!validate(id)) {
      return getStatusAndMessage('ID is not valid', 400);
    }
    const user = await updateUserByIdFromBd(id);

    if (!user) {
      return getStatusAndMessage('User with this ID does not exist', 404);
    } else {
      if (user.password === updateUserDto.oldPassword) {
        user.password = updateUserDto.newPassword;
        user.version = user.version += 1;
        user.updatedAt = Date.now();
        return getStatusAndMessage(user, 200);
      } else {
        return getStatusAndMessage('oldPassword is wrong', 403);
      }
    }
  }

  async remove(id: string) {
    if (!validate(id)) {
      return getStatusAndMessage('ID is not valid', 400);
    }
    const user = await deleteUsersByIdFromBd(id);

    if (user) {
      return getStatusAndMessage(user, 204);
    } else {
      return getStatusAndMessage('User with this ID does not exist', 404);
    }
  }
}
