import { PendingProps } from '@Models/pending-props.model';
import { TypedActionProps } from '@Types/action.types';

export type SetPendingActionType<T extends string> = TypedActionProps<T, PendingProps>;
