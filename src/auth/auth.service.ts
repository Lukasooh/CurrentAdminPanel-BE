
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { first } from 'rxjs';
import { ItemsService } from '../items/items.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private itemsService: ItemsService, 
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string,
    pass: string
  ): Promise<{ access_token: string }> {
    try {
    const user = await this.itemsService.findOne(email);

    if (user?.password !== pass) {
      console.log('Invalid password');
      throw new UnauthorizedException();
    }
    const payload = { role: user.role, email: user.email };
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return { 
      access_token: await this.jwtService.signAsync(payload)
    };
  }catch (error) {
    console.error('Error during signIn:', error);
    throw new UnauthorizedException('Invalid credentials');
  }}
}
