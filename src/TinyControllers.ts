/// <reference path="../index.d.ts" />

import { Document, Model } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { TinyError } from 'tiny-errors';

class TinyController<T, DocType extends Document> {
  protected _model: Model<DocType>;
  constructor(model: Model<DocType>) {
    this._model = model;
  }
  doFind(req: Request, res: Response, next: NextFunction) {
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
      .catch(error => next(TinyError.parse(error)));
  }
  doGet(req: Request, res: Response, next: NextFunction) {
    this._model
      .findById(req.params.id)
      .then(data => this.sendSuccess(res, data))
      .catch(error => next(TinyError.parse(error)));
  }
  doPost(req: Request, res: Response, next: NextFunction) {
    this._model
      .create(req.body)
      .then(data => this.sendSuccess(res, data))
      .catch(error => next(TinyError.parse(error)));
  }
  doPut(req: Request, res: Response, next: NextFunction) {
    this._model
      .findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      })
      .then(data => this.sendSuccess(res, data))
      .catch(error => next(TinyError.parse(error)));
  }
  doDelete(req: Request, res: Response, next: NextFunction) {
    this._model
      .findByIdAndRemove(req.params.id)
      .then(data => this.sendSuccess(res, data))
      .catch(error => next(TinyError.parse(error)));
  }
  protected sendSuccess(res: Response, data: any) {
    res.status(200).send(data);
  }
}

export { TinyController };
