/// <reference path="../index.d.ts" />

import { Document, Model } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { TinyError } from 'tiny-errors';

class TinyController<T, DocType extends Document> {
  protected _model: Model<DocType>;
  constructor(model: Model<DocType>) {
    this._model = model;
  }
  doFind(req: Request, res: Response) {
    let query = this._model.find(req.find.where);
    if (req.find.populate) {
      req.find.populate.forEach(path => {
        query.populate(path);
      });
    }
    if (req.find.select) {
      query.select(req.find.select.join(' '));
    }
    query
      .then(data => this.sendSuccess(res, data))
      .catch(error => this.sendFailure(res, error));
  }
  doGet(req: Request, res: Response) {
    this._model
      .findById(req.params.id)
      .then(data => this.sendSuccess(res, data))
      .catch(error => this.sendFailure(res, error));
  }
  doPost(req: Request, res: Response, next: NextFunction) {
    this._model
      .create(req.body)
      .then(data => this.sendSuccess(res, data))
      .catch(error => next(error));
  }
  doPut(req: Request, res: Response) {
    this._model
      .findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      })
      .then(data => this.sendSuccess(res, data))
      .catch(error => this.sendFailure(res, error));
  }
  doDelete(req: Request, res: Response) {
    this._model
      .findByIdAndRemove(req.params.id)
      .then(data => this.sendSuccess(res, data))
      .catch(error => this.sendFailure(res, error));
  }
  protected sendSuccess(res: Response, data: any) {
    res.status(200).send(data);
  }
  protected sendFailure(res: Response, error: any) {
    let appError = TinyError.parse(error);
    res.status(appError.code).send(appError.message);
  }
}

export { TinyController };
