import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  private error : HttpErrorResponse;

  @Output()
  private errorMessageToEmit = new EventEmitter<string>();

  constructor() { }

  public storeError(error : HttpErrorResponse) {
    this.error = error;
  }

  public getError() {
    return this.error;
  }

  public getErrorMessage() {
    return this.error.error.message;
  }

  public setErrorMessageToEmit(error: Error) {
    this.errorMessageToEmit.emit(this.getClientMessage(error));
  }

  public getErrorMessageToEmit() {
    return this.errorMessageToEmit;
  }

  getClientMessage(error: Error): string {
    if (!navigator.onLine) {
      return 'No Internet Connection';
    }
    return error?.message ? error.message : error?.toString();
  }

  getClientStack(error: Error): string | undefined {
    return error.stack;
  }

  getServerMessage(error: HttpErrorResponse): string {
    return error.message;
  }

  getServerStack(): string {
    // handle stack trace
    return this.error.error.trace;
  }
}
