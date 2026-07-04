import moment, {Moment} from "moment";
import {HttpErrorResponse} from "@angular/common/http";

export interface CustomErrorResponse {
  statusCode: number;
  message: string;
  timestamp: Moment;
}

const NETWORK_ERROR_KEY = 'ALERT.connection-error';
const FALLBACK_ERROR_KEY = 'ALERT.unexpected-error';

export function normalizeHttpError(input: unknown): CustomErrorResponse {
  if (input instanceof HttpErrorResponse) {
    // status 0 => request never reached the server (offline, CORS, DNS, ...).
    if (input.status === 0) {
      return build(0, NETWORK_ERROR_KEY);
    }
    const body = input.error;
    if (typeof body === 'string' && body.trim().length) {
      return build(input.status, body);
    }
    if (body && typeof body === 'object' && !(body instanceof ProgressEvent)) {
      return fromBody(body as Record<string, unknown>, input.status);
    }
    return build(input.status, input.message || FALLBACK_ERROR_KEY);
  }

  if (input instanceof ProgressEvent) {
    return build(0, NETWORK_ERROR_KEY);
  }

  if (input && typeof input === 'object') {
    if (input instanceof Error) {
      return build(0, input.message || FALLBACK_ERROR_KEY);
    }
    return fromBody(input as Record<string, unknown>, 0);
  }

  if (typeof input === 'string' && input.trim().length) {
    return build(0, input);
  }

  return build(0, FALLBACK_ERROR_KEY);
}

function fromBody(body: Record<string, unknown>, fallbackStatus: number): CustomErrorResponse {
  const statusCode = Number(body['statusCode'] ?? body['status'] ?? fallbackStatus) || fallbackStatus || 0;
  const rawMessage = body['message'] ?? body['error'] ?? body['detail'];
  const message = rawMessage != null && `${rawMessage}`.trim().length ? `${rawMessage}` : FALLBACK_ERROR_KEY;
  const rawTs = body['timestamp'] as string | undefined;
  const ts = rawTs ? moment(rawTs) : moment();
  return {statusCode, message, timestamp: ts.isValid() ? ts : moment()};
}

function build(statusCode: number, message: string): CustomErrorResponse {
  return {statusCode, message, timestamp: moment()};
}
