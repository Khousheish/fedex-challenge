// tslint:disable: max-line-length
import { createAction, props } from '@ngrx/store';

import { PendingProps } from '@Models/pending-props.model';
import { ActionCreatorPropsType } from '@Types/action.types';

import { SignUpProps, SignUpSuccessProps } from '../models/action-props.model';

export enum AuthActionsTypes {
  Pending = '[Auth] PENDING',

  SignUp = '[Auth] SIGN_UP',
  SignUpSuccess = '[Auth] SIGN_UP_SUCCESS',
}

export const setPendingState: ActionCreatorPropsType<AuthActionsTypes.Pending, PendingProps> = createAction(AuthActionsTypes.Pending, props<PendingProps>());

export const signUp: ActionCreatorPropsType<AuthActionsTypes.SignUp, SignUpProps> = createAction(AuthActionsTypes.SignUp, props<SignUpProps>());
export const signUpSuccess: ActionCreatorPropsType<AuthActionsTypes.SignUpSuccess, SignUpSuccessProps> = createAction(AuthActionsTypes.SignUpSuccess, props<SignUpSuccessProps>());
