import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/exports';
import { RootState, store } from './../store/store';
import { TypedUseSelectorHook } from 'react-redux/es/types';

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;