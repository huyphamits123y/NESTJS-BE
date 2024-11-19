// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { isArray } from 'class-validator';  // Import isArray correctly
// import { verify } from 'jsonwebtoken';
// import { UsersService } from 'src/users/users.service';
// import { JwtPayload } from 'jsonwebtoken';
// import { config } from 'dotenv';
// import { UserEntity } from 'src/users/entities/user.entity';
// config();
// declare global {
//     namespace Express {
//         interface Request {
//             currentUser?: UserEntity
//         }
//     }
// }
// @Injectable()
// export class CurrentUserMiddleware implements NestMiddleware {
//     constructor(private readonly userService: UsersService) { }
//     async use(req: Request, res: Response, next: NextFunction) {
//         console.log('huy')
//         const authHeader = req.headers.authorization || req.headers.Authorization;

//         // Check if authHeader exists and is a string
//         if (!authHeader || isArray(authHeader) || authHeader.startsWith('Bearer ')) {
//             req.currentUser = null;

//             next();
//         } else {
//             console.log('else')
//             const token = authHeader.split(' ')[1];  // Safely split if authHeader is a string
//             const { id } = <JwtPayloadCustom>verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
//             console.log('id', id)
//             const userId = Number(id);
//             const currentUser = await this.userService.findOne(userId);
//             req.currentUser = currentUser;
//             console.log(currentUser)
//             next();
//         }
//     }
// }
// interface JwtPayloadCustom {
//     id: string;
// }



import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { isArray } from 'class-validator';
import { verify, TokenExpiredError } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from 'jsonwebtoken';
import { config } from 'dotenv';
import { UserEntity } from 'src/users/entities/user.entity';
config();

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserEntity;
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private readonly userService: UsersService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        console.log('Middleware triggered');
        const authHeader = req.headers.authorization || req.headers.Authorization;

        // Kiểm tra authHeader và token
        if (!authHeader || isArray(authHeader) || !authHeader.startsWith('Bearer ')) {
            req.currentUser = null;
            console.log('huy')
            return next();
        }

        try {
            const token = authHeader.split(' ')[1];  // Lấy token từ header
            const { id } = <JwtPayloadCustom>verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);

            const userId = Number(id);
            const currentUser = await this.userService.findOne(userId);
            req.currentUser = currentUser;
            console.log('User:', currentUser);
            next();
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                console.log('Token has expired');
                res.status(401).json({ message: 'Token expired, please login again' });
            } else {
                console.log('Token verification failed:', error.message);
                res.status(401).json({ message: 'Invalid token' });
            }
        }
    }
}

interface JwtPayloadCustom {
    id: string;
}
