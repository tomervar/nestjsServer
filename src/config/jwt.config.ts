/* eslint-disable prettier/prettier */
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleAsyncOptions = {
    useFactory: () => {
        return{
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: `${process.env.EXPIRES_IN}s` },
        }
    }
}
