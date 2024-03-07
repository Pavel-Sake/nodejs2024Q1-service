import { User, UserInput } from 'src/user/interfaces/user.interfaces';
import { v4 } from 'uuid';

const users: User[] = [];

async function createUserInBd(data: UserInput): Promise<User> {
  const newUser = {
    id: v4(),
    login: data.login,
    password: data.password,
    version: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  users.push(newUser);
  return newUser;
}

async function getAllUsersFromBd(): Promise<User[]> {
  return users;
}

async function getUsersByIdFromBd(id: string) {
  const user = users.find((user) => {
    if (user.id === id) {
      return true;
    }
  });

  return user;
}

async function updateUserByIdFromBd(id: string) {
  const user = users.find((user) => {
    if (user.id === id) {
      return true;
    }
  });
  return user;
}

async function deleteUsersByIdFromBd(id: string) {
  let index = null;
  const user = users.find((user, idx) => {
    if (user.id === id) {
      index = idx;
      return true;
    }
  });

  if (user) {
    users.splice(index, 1);
    return user;
  } else {
    return user;
  }
}

export {
  createUserInBd,
  getAllUsersFromBd,
  getUsersByIdFromBd,
  updateUserByIdFromBd,
  deleteUsersByIdFromBd,
};
