import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error: { name: string; message: string }) {
    if (error instanceof HttpErrorResponse) {
      console.log(error.name, ':', error.message);
    } else {
      console.log(error.name, ':', error.message);
    }
  }
}
