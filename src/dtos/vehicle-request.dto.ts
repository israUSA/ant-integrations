import { IsString, IsOptional, Equals, Length } from 'class-validator';

export class VehicleRequestDto {
  @IsString({ message: 'La placa debe ser una cadena de texto' })
  @Length(6, 7, { message: 'La placa debe tener entre 6 y 7 caracteres' })
  placa: string;

  @IsOptional()
  @IsString()
  @Equals('0374')
  type?: string = '0374';
}
