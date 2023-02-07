import { createSlice } from '@reduxjs/toolkit';

const userDataSlice = createSlice({
    name: 'userData',
    initialState:{
        id: 0,
        email: "",
        questionsId: [],
        confirmedMail : false,
        submitedExam: false,
        startedExam : false,
        examStartTime : "",
        isDirty: false
    },
    reducers:
    {
        changeUser(state, action)
        {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.questionsId = action.payload.questionsId;
            state.confirmedMail = action.payload.confirmedMail;
            state.submitedExam = action.payload.submitedExam;
            state.startedExam = action.payload.startedExam;
            state.examStartTime = action.payload.examStartTime;
            state.isDirty = false;
        },
        setUserField(state, action)
        {
            state.isDirty = true;
            switch(action.payload.key)
            {
                case "confirmedMail":
                    state.confirmedMail = action.payload.value;
                    break;
                case "submitedExam":
                    state.submitedExam = action.payload.value;
                    break;
                case "startedExam":
                    state.startedExam = action.payload.value;
                break;
                case "examStartTime":
                    state.examStartTime = action.payload.value;
                    break;
                case "isDirty":
                    state.isDirty = action.payload.value;
                    break;
            }
        },
    }
});

export const { changeUser, setUserField } = userDataSlice.actions;
export const userReducer = userDataSlice.reducer;