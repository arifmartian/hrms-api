import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
    MinLength,
} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(4, { message: 'Name must have atleast 4 characters.' })
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail(null, { message: 'Please provide valid Email.' })
    email: string;

    @IsString()
    @IsEnum(['F', 'M'])
    gender: string;

    @IsNumber()
    role_id: number;
}