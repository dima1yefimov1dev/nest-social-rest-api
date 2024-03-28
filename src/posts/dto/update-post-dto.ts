import { IsString, IsOptional } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  body: string | null;

  @IsString()
  @IsOptional()
  title?: string;
}
