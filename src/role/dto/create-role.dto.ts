import {
    IsNotEmpty,
    IsString,
    MinLength,
} from 'class-validator';

export class CreateRoleDto {

    @IsString()
    @MinLength(4, { message: 'Name must have atleast 4 characters.' })
    @IsNotEmpty()
    name: string;

    status: string;
}