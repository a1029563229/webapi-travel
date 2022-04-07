// src/guards/auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
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
    // 没有 token，或者 token 不包含用户信息时，认为 token 失效
    if (!token || !user_id) {
      throw new ForbiddenException('token 已失效');
    }

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // 没有角色权限限制时，直接放行
    if (!roles) {
      return true;
    }

    // 角色权限为 `admin` 时，需要用户 role 为 99 才能访问
    if (roles[0] === 'admin' && user_role !== 99) {
      throw new ForbiddenException('角色权限不足');
    }

    return true;
  }
}
