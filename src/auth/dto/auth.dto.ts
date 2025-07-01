import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  name!: string; //!tells Ts- I know this will be initialized elsewhere

  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;
}

export class loginDTO {
  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;
}
