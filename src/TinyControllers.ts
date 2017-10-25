/// <reference path="../index.d.ts" />

import { Document, Model } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

class TinyControllers<T extends Document> {
  protected _model: Model<T>;
  constructor(model: Model<T>) {
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
      .then(data => res.status(200).send(data))
      .catch(error => next(error));
  }
  doGet(req: Request, res: Response, next: NextFunction) {
    this._model
      .findById(req.params.id)
      .then(data => res.status(200).send(data))
      .catch(error => next(error));
  }
  doPost(req: Request, res: Response, next: NextFunction) {
    this._model
      .create(req.body)
      .then(data => res.status(200).send(data))
      .catch(error => next(error));
  }
  doPut(req: Request, res: Response, next: NextFunction) {
    this._model
      .findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      })
      .then(data => res.status(200).send(data))
      .catch(error => next(error));
  }
  doDelete(req: Request, res: Response, next: NextFunction) {
    this._model
      .findByIdAndRemove(req.params.id)
      .then(data => res.status(200).send(data))
      .catch(error => next(error));
  }
}

export { TinyControllers };
