// import { ExecutionContext, Injectable, CanActivate, UnauthorizedException } from "@nestjs/common";
// import { Reflector } from "@nestjs/core";
// import { Observable } from "rxjs";
// @Injectable()
// export class AuthorizeGuard implements CanActivate {
//     constructor(private reflector: Reflector) {

//     }
//     canActivate(context: ExecutionContext): boolean {
//         const allowedRoles = this.reflector.get<string[]>('allowedRoles', context.getHandler());
//         const request = context.switchToHttp().getRequest();
//         const result = request?.currentUser?.roles.map((role: string) => allowedRoles.includes(role)).find((val: boolean) => val === true);
//         if (result) return true;
//         throw new UnauthorizedException('Sorry, you are not authorized.')
//     }

// }
import { ExecutionContext, Injectable, CanActivate, UnauthorizedException, mixin } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

// @Injectable()
// export class AuthorizeGuard implements CanActivate {
//     constructor(private reflector: Reflector) { }

//     canActivate(context: ExecutionContext): boolean {
//         // Lấy danh sách allowedRoles từ metadata
//         const allowedRoles = this.reflector.get<string[]>('allowedRoles', context.getHandler());

//         // Nếu không có allowedRoles, mặc định cho phép
//         if (!allowedRoles || allowedRoles.length === 0) {
//             return true;
//         }

//         const request = context.switchToHttp().getRequest();
//         const userRoles = request?.currentUser?.roles;

//         // Kiểm tra nếu userRoles tồn tại và là một mảng
//         if (!userRoles || !Array.isArray(userRoles)) {
//             throw new UnauthorizedException('User roles not found');
//         }

//         // Kiểm tra xem bất kỳ vai trò nào của người dùng có nằm trong allowedRoles không
//         const hasRole = userRoles.some((role: string) => allowedRoles.includes(role));

//         if (hasRole) return true;

//         throw new UnauthorizedException('Sorry, you are not authorized.');
//     }
// }







export const AuthorizeGuard = (allowedRoles: string[]) => {
    class RolesGuardMixin implements CanActivate {
        canActivate(context: ExecutionContext): boolean {
            const request = context.switchToHttp().getRequest();
            const result = request?.currentUser?.roles
                .map((role: string) => allowedRoles.includes(role))
                .find((val: boolean) => val === true);

            if (result) return true;

            throw new UnauthorizedException('Sorry, you are not authorized.');
        }
    }
    const guard = mixin(RolesGuardMixin);
    return guard
};
