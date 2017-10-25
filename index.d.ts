import * as express from 'express';
import { Document, Model } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      find: {
        select?: any;
        where?: object;
        populate?: any;
      };
    }
  }
}

declare class TinyControllers<T extends Document> {
  protected _model: Model<T>;
  constructor(model: Model<T>);
  doFind(req: Request, res: Response, next: NextFunction): void;
  doGet(req: Request, res: Response, next: NextFunction): void;
  doPost(req: Request, res: Response, next: NextFunction): void;
  doPut(req: Request, res: Response, next: NextFunction): void;
  doDelete(req: Request, res: Response, next: NextFunction): void;
}

export { TinyControllers };
