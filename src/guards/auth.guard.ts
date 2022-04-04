import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
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

    if (user_role !== 99) {
      throw new ForbiddenException('角色权限不足');
    }

    return true;
  }
}
