import { createSlice } from '@reduxjs/toolkit';

const questionsSlice = createSlice({
    name: 'questionsData',
    initialState:{
        isDirty: true,
        data: [
        {
            id: 0,
            question: "",
            alternatives: [{id: 1, answer: "default"}], 
            answerId: 0,
            userAnswerId: 0
        }]
    },
    reducers:
    {
        loadQuestionsData(state, action)
        {
            state.data = action.payload;
        },
        selectQuestionAlternative(state, action)
        {
            state.data.map((qObject) => {
                if(qObject.id == action.payload.questionId)
                {
                    qObject.userAnswerId = action.payload.answerId;
                }
            })
        },
        setSubmissionDirty(state, action)
        {
            state.isDirty = action.payload.value;
        }
    }
});

export const { loadQuestionsData, selectQuestionAlternative, setSubmissionDirty } = questionsSlice.actions;
export const questionsReducer = questionsSlice.reducer;