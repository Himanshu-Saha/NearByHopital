import { configureStore, } from '@reduxjs/toolkit';
import { userSlice } from './userDetails';
import { useDispatch, useSelector } from 'react-redux';
import { network } from './network';
export const store = configureStore({
    reducer:{
        user:userSlice.reducer,
        network:network.reducer,
    },
    middleware: getDefaultMiddleware=>getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
