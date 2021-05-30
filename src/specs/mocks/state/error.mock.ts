import { Error } from '@Models/error.model';
import { ErrorsState } from '@Store/error/errors-state';

export const MOCKED_ERROR: Error = {
  error: 'Some Error',
  status: 404,
  statusText: 'Not Found',
};

export const MOCKED_ERROR_STATE: ErrorsState = [MOCKED_ERROR];
