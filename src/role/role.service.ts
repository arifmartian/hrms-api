import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { isEmpty } from 'class-validator';
const STATUS = ["ACTIVE", "INACTIVE"];

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) { }

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {

    const { name: roleName } = createRoleDto;
    // request validate
    if (isEmpty(roleName)) throw new Error("name is required");

    const filter = {
      name: roleName.trim().toUpperCase(),
      status: "ACTIVE",
    }
    // validate role name
    const roleExist = await this.roleRepository.findOne({ where: filter });
    if (!isEmpty(roleExist)) throw new Error("Role already exists!")

    const role: Role = new Role();
    role.name = roleName.trim().toUpperCase();
    return this.roleRepository.save(role);  // insert to db
  }

  findAllRole(): Promise<Role[]> {
    return this.roleRepository.find(
      {
        where: { status: "ACTIVE" },
        select: ['id', 'name'],
      });
  }

  findOneRole(id: number): Promise<Role> {
    // request validate
    if (isNaN(id) || id <= 0) throw new Error("id is required");

    return this.roleRepository.findOne(
      {
        where: { id: id },
        select: ['id', 'name'],
      });
  }

  async updateRole(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {

    const { name: roleName, status: status } = updateRoleDto;

    // request validate
    if (!roleName && !status) throw new Error("name or status is required");

    const isRoleExist = await this.roleRepository.findOne(
      {
        where: { id: id },
        select: ['id', 'name'],
      });

    if (isEmpty(isRoleExist)) throw new NotFoundException("Role not found");

    if (roleName) {
      const filter = {
        id: Not(id),
        name: roleName.trim().toUpperCase(),
        status: "ACTIVE",
      }

      // validate role name
      const roleExist = await this.roleRepository.findOne({ where: filter });
      if (!isEmpty(roleExist)) throw new Error("Role already exists!")
    }

    if (status && !STATUS.includes(status)) throw new Error("Please provide valid status")

    const role: Role = new Role();
    if (roleName) role.name = updateRoleDto.name.trim().toUpperCase();
    if (status) role.status = updateRoleDto.status.trim().toUpperCase();
    role.id = id;
    return this.roleRepository.save(role);
  }

  removeRole(id: number): Promise<{ affected?: number }> {
     // request validate
     if (isNaN(id) || id <= 0) throw new Error("id is required");
    return this.roleRepository.delete(id);
  }
}
