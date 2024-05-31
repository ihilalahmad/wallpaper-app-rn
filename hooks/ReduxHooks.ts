import { RootState } from '@/store/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

// you can also create some redux hooks using the above explicit types
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
