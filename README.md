# tiny-controllers
Controller with base methods for your REST server. Tiny-controllers now only supports for Mongoose.
# Installation
`$ npm install --save tiny-controllers`
# Usage
Create your own Controller then extends TinyController. 
```javascript
// IUser is model interface and
// IUserDoc is model interface which extends Document (Mongoose)
class UsersController extends TinyController<IUser, IUserDoc> {
  constructor() {
    super(User);
  }
  newMethod(req: Request, res: Response) {
    ...
      .then(data => this.sendSuccess(res, data))
      .catch(error => this.sendFailure(res, error));
  }
}
```
# Properties
- [_model](#model)
## Model
Use for child class to override or create new methods.
```javascript
protected _model: Model<DocType>;

// Example usage
import { UserModel } from './UserModel';

class UserController extends TinyController<IUser, IUserDoc> {
  constructor() {
    super(User);
  }
  // override
  doGet(req: Request, res: Response) {
    // some code here...
    this._model.findById(...)
      .then(...)
      .catch(...);
    // some code here...
  }
  newMethod(req: Request, res: Response) {
    // some code here...
    this._model.find({...})
      .then(...)
      .catch(...);
    // some code here...
  }
  ...
}
...
```
# Methods
- [constructor](#constructor)
- [doFind](#dofind)
- [doGet](#doget)
- [doPost](#dopost)
- [doPut](#doput)
- [doDelete](#dodelete)
- [sendSuccess](#sendsuccess)
- [sendFailure](#sendfailure)
## constructor
```javascript
constructor(model: Model<DocType>);
```
## doFind
```javascript
doFind(req: Request, res: Response): void;
```
## doGet
```javascript
doGet(req: Request, res: Response): void;
```
## doPost
```javascript
doPost(req: Request, res: Response, next: NextFunction): void;
```
## doPut
```javascript
doPut(req: Request, res: Response): void;
```
## doDelete
```javascript
doDelete(req: Request, res: Response): void;
```
## sendSuccess
```javascript
protected sendSuccess(res: Response, data: any): void;
```
## sendFailure
```javascript
protected sendFailure(res: Response, error: any): void;
```
# License
[MIT](https://github.com/tinyRush/tiny-controllers/blob/master/LICENSE)