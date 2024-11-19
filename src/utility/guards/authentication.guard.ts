import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
// class AuthenticationGuard kiểm tra currenUser có tồn tại hay không, kiểm tra người dùng có signup hay chưa
export class AuthenticationGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean {
        const request = context.switchToHttp().getRequest();
        return request.currentUser
    }
}