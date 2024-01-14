export enum HttpCode {
  OK = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
export type CustomErrorContent = {
  message: string;
  context?: {[key: string]: any}
}

export default class ExeptionError extends Error {
  private readonly _logging: boolean;
  private readonly _context: { [key: string]: any };
  private readonly _code: number | HttpCode;

  constructor(params?: {code?: number | HttpCode , message?: string, logging?: boolean, context?: { [key: string]: any }}) {
    const { code, message, logging } = params || {};

    super(message || "Bad request");
    this._code = code || HttpCode.BAD_REQUEST;
    this._logging = logging || false;
    this._context = params?.context || {};

    Object.setPrototypeOf(this, new.target.prototype);
  }

  get errors() {
    return [{ message: this.message, context: this._context }];
  }

  get statusCode() {
    return this._code;
  }

  get logging() {
    return this._logging;
  }
}

