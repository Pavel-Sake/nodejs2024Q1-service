interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

interface UserInput {
  login: string;
  password: string;
}

interface UpdatePassword {
  oldPassword: string; // previous password
  newPassword: string; // new password
}

export { User, UserInput, UpdatePassword };