import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers['token'];
    const user_id = req['context']['user_id'];
    const user_role = req['context']['user_role'];
    if (!token || !user_id) {
      throw new ForbiddenException('token 已失效');
    }

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    if (roles[0] === 'admin' && user_role !== 99) {
      throw new ForbiddenException('角色权限不足');
    }

    return true;
  }
}
