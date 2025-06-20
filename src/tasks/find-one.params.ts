import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class findOneParams{
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    id: string;
}