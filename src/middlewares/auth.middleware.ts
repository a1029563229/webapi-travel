import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { UserService } from '../user/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['token'];
    req['context'] = req['context'] || {};
    if (!token) return next();

    try {
      const user = await this.userService.queryUserByToken(token);
      req['context']['token'] = token;
      req['context']['user_id'] = user.id;
      req['context']['user_role'] = user.role;
    } finally {
      next();
    }
  }
}
