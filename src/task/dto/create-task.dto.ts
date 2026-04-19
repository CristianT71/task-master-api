import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateTaskDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsBoolean()
    @IsOptional()
    isCompleted: boolean;

    @IsUUID()
    @IsNotEmpty()
    userId: string;
}
