import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/db/schema/enum';

export class LoginEmailPasswordDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  role: UserRole;
}

export class RegisterEmailPasswordDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  role: UserRole;
}
