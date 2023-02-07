import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const navigationSlice = createSlice({
    name: 'navigation',
    initialState: 
    {
        currentPath: window.location.pathname
    },
    reducers:
    {
        changePath(state, action)
        {
            state.currentPath = action.payload;
        },
        loadPath(state, action)
        {
            state.currentPath = action.payload;
            pushHistory(state.currentPath);
        },
    }
});

const pushHistory = (to) =>
{
    window.history.pushState({}, '', to);
}

export const { loadPath, changePath } = navigationSlice.actions;
export const navigationReducer = navigationSlice.reducer;

