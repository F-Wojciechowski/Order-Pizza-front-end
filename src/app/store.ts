import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import {userDataSlice} from "../features/UserData/userDataSlice";

export const store = configureStore({
    reducer: {
        userData: userDataSlice.reducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
