import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { responseCode } from "../services/response-helpers";
const { SUCCESS, ERROR, NOTFOUND } = responseCode;

@Controller('api/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post("/create")
  async create(@Body() createRoleDto: CreateRoleDto) {
    try {
      const roleInserted = await this.roleService.createRole(createRoleDto);
      if (roleInserted) {
        return {
          status: true,
          code: SUCCESS,
          message: "Role added successfully",
        }
      } else {
        return {
          status: false,
          code: ERROR,
          message: "Something went wrong, please try again",
        }
      }
    } catch (err) {
      return {
        status: false,
        code: ERROR,
        message: err.message,
      }
    }
  }

  @Get("/list")
  async findAll() {
    try {
      const roleList = await this.roleService.findAllRole();
      if (roleList) {
        return {
          status: true,
          code: SUCCESS,
          message: "Role list fetched successfully",
          data: roleList
        }
      } else {
        return {
          status: false,
          code: NOTFOUND,
          message: "No record found",
        }
      }
    } catch (err) {
      return {
        status: false,
        code: ERROR,
        message: err.message,
      }
    }
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    try {
      const isRoleExist = await this.roleService.findOneRole(+id); // type coercion
      if (isRoleExist) {
        return {
          status: true,
          code: SUCCESS,
          message: "Role fetched successfully",
          data: isRoleExist
        }
      } else {
        return {
          status: false,
          code: NOTFOUND,
          message: "Role not found"
        }
      }
    } catch (err) {
      return {
        status: false,
        code: ERROR,
        message: err.message,
      }
    }
  }

  @Patch('/update/:id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    try {
      const isRoleUpdated = await this.roleService.updateRole(+id, updateRoleDto);
      if (isRoleUpdated) {
        return {
          status: true,
          code: SUCCESS,
          message: "Role updated successfully",
        }
      } else {
        return {
          status: false,
          code: NOTFOUND,
          message: "Role not found"
        }
      }
    } catch (err) {
      return {
        status: false,
        code: ERROR,
        message: err.message,
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const isRoleExist = await this.roleService.findOneRole(+id);
    if (!isRoleExist) {
      return {
        status: false,
        code: NOTFOUND,
        message: "Role not found"
      }
    }

    const isRoleDeleted = await this.roleService.removeRole(+id);
    if (isRoleDeleted) {
      return {
        status: true,
        code: SUCCESS,
        message: "Role deleted successfully",
      }
    }
  }
}
