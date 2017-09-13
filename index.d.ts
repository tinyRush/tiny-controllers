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
    interface Router {
      doFind(req: Request, res: Response);
      doGet(req: Request, res: Response);
      doPost(req: Request, res: Response);
      doPut(req: Request, res: Response);
      doDelete(req: Request, res: Response);
    }
  }
}

declare class BaseController<T, DocType extends Document> {
  protected _model: Model<DocType>;
  constructor(model: Model<DocType>);
  doFind(req: Request, res: Response): void;
  doGet(req: Request, res: Response): void;
  doPost(req: Request, res: Response, next: NextFunction): void;
  doPut(req: Request, res: Response): void;
  doDelete(req: Request, res: Response): void;
  protected sendSuccess(res: Response, data: any): void;
  protected sendFailure(res: Response, error: any): void;
}

export { BaseController };
