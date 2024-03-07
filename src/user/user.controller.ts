import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const response = await this.userService.findOne(id);
    res.status(response.status).send(response.message);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const response = await this.userService.update(id, updateUserDto);
    res.status(response.status).send(response.message);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const response = await this.userService.remove(id);
    console.log('dddddddddddddddddddd', response.message);

    res.status(response.status).send(response.message);
  }
}
