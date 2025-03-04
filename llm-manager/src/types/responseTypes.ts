import { Response } from 'express';

// Set interfaces for a typed response to follow the JSend response format.

export interface JSendSuccess<T> {
  status: 'success';
  data: T;
}

export interface JSendFail {
  status: 'fail';
  message: string;
}

export interface JSendError {
  status: 'error';
  message: string;
  code?: number;
}

export interface TypedResponse<T> extends Response {
  json(data: JSendSuccess<T> | JSendFail | JSendError): this;
}
