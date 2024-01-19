import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    const roleInserted = await this.roleService.createRole(createRoleDto);
    let response: Object;
    if (roleInserted) {
      response = {
        statusCode: 200,
        status: true,
        message: "Role inserted successfully",
        data: roleInserted
      }
    } else {
      response = {
        statusCode: 500,
        status: false,
        message: "Something went wrong, please try again",
      }
    }
    return response;
  }

  @Get()
  async findAll() {
    const roleList = await this.roleService.findAllRole();
    if (roleList) {
      return {
        statusCode: 200,
        status: true,
        message: "Role list fetched successfully",
        data: roleList
      }
    } else {
      return {
        statusCode: 404,
        status: false,
        message: "No record found",
      }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {

    const isRoleExist = await this.roleService.findOneRole(+id);
    let response: object;
    if (isRoleExist) {
      response = {
        statusCode: 200,
        status: true,
        message: "Role fetched successfully",
        data: isRoleExist
      }
    } else {
      response = {
        statusCode: 404,
        status: false,
        message: "Role not found"
      }
    }
    return response;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {

    const isRoleExist = await this.roleService.findOneRole(+id);
    if (!isRoleExist) {
      return {
        statusCode: 404,
        status: false,
        message: "Role not found"
      }
    }
    const isRoleUpdated = await this.roleService.updateRole(+id, updateRoleDto);
    if (isRoleUpdated) {
      return {
        statusCode: 200,
        status: true,
        message: "Role updated successfully",
        data: isRoleUpdated
      }
    } else {
      return {
        statusCode: 404,
        status: false,
        message: "Role not found"
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const isRoleExist = await this.roleService.findOneRole(+id);
    if (!isRoleExist) {
      return {
        statusCode: 404,
        status: false,
        message: "Role not found"
      }
    }

    const isRoleDeleted = await this.roleService.removeRole(+id);
    if (isRoleDeleted) {
      return {
        statusCode: 200,
        status: true,
        message: "Role deleted successfully",
      }
    }
  }
}
