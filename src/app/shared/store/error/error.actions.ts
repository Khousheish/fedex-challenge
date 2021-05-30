// tslint:disable: max-line-length
import { createAction, props } from '@ngrx/store';

import { ErrorsProps } from '@Models/error-props.model';
import { ActionCreatorPropsType, ActionCreatorType } from '@Types/action.types';

export enum ErrorActionsTypes {
  CatchError = '[Error] CATCH_ERROR',

  ClearError = '[Error] CLEAR_ERROR',
}

export const catchError: ActionCreatorPropsType<ErrorActionsTypes.CatchError, ErrorsProps> = createAction(ErrorActionsTypes.CatchError, props<ErrorsProps>());
export const clearError: ActionCreatorType<ErrorActionsTypes.ClearError> = createAction(ErrorActionsTypes.ClearError);
