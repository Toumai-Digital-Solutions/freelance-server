import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/db/schema/enum';

export class LoginCredPasswordDto {
  @ApiProperty()
  cred: string;
  @ApiProperty()
  password: string;
}

export class RegisterEmailPasswordDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  role: UserRole;
}
