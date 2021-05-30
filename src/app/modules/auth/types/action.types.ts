import { TypedActionProps } from '@Types/action.types';

import { SignUpSuccessProps } from '../models/action-props.model';
import { AuthActionsTypes } from '../store/auth.actions';

export type SignUpSuccessActionType = TypedActionProps<AuthActionsTypes.SignUpSuccess, SignUpSuccessProps>;
