import { ErrorsProps } from '@Models/error-props.model';
import { ErrorActionsTypes } from '@Store/error/error.actions';
import { TypedActionProps } from '@Types/action.types';

export type CatchErrorActionType = TypedActionProps<ErrorActionsTypes.CatchError, ErrorsProps>;
