import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const { name, email, gender, role_id } = createUserDto;

    if (!name) return { status: false, statusCode: 401, message: "name field is required" }
    if (!email) return { status: false, statusCode: 401, message: "email field is required" }
    if (!gender) return { status: false, statusCode: 401, message: "gender field is required" }
    if (!role_id) return { status: false, statusCode: 401, message: "role_id field is required" }

    return this.userService.create(createUserDto);
  }

  @Get("list")
  async findAll() {
    const userList = await this.userService.findAll();
    if (userList) {
      return {
        statusCode: 200,
        status: true,
        message: "User list fetched successfully",
        data: userList
      }
    } else {
      return {
        statusCode: 404,
        status: false,
        message: "No user record found",
      }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const userDetails = await this.userService.findOne(+id);
    if (userDetails) {
      return {
        statusCode: 200,
        status: true,
        message: "User details fetched successfully",
        data: userDetails
      }
    } else {
      return {
        statusCode: 404,
        status: false,
        message: "User details not found"
      }
    }
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const isUserExist = await this.userService.findOne(+id);
    if (!isUserExist) {
      return {
        statusCode: 404,
        status: false,
        message: "User not found"
      }
    }
    const isUserUpdated = await this.userService.update(+id, updateUserDto);
    if (isUserUpdated) {
      return {
        statusCode: 200,
        status: true,
        message: "User updated successfully",
        data: isUserUpdated
      }
    } else {
      return {
        statusCode: 404,
        status: false,
        message: "Something went wrong, please try again"
      }
    }
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    const isUserExist = await this.userService.findOne(+id);
    if (!isUserExist) {
      return {
        statusCode: 404,
        status: false,
        message: "User not found"
      }
    }

    const isRoleDeleted = await this.userService.remove(+id);
    if (isRoleDeleted) {
      return {
        statusCode: 200,
        status: true,
        message: "User deleted successfully",
      }
    }
    return this.userService.remove(+id);
  }
}
