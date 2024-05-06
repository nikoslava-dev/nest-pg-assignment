import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from "express";

@Injectable()
export class CustomMiddleware implements NestMiddleware {
  constructor() {}

  use(req: Request, res: Response, next: (error?: any) => void) {
    console.log('got into user controller middleware');
    
    next();
  }
}
