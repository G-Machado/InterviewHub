import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';

const submissionSlice = createSlice({
    name: 'submissionData',
    initialState:{
        isDirty: true,
        answers: [
            {
                "questionId": 0,
                "answerId": 0
            }
        ],
        id: 0
    },
    reducers:
    {
        setupSubmission(state, action)
        {
            state.isDirty = action.payload.isDirty;
            state.answers = action.payload.answers;
            state.id = action.payload.id;
        },
        selectSubmissionAlternative(state, action)
        {
            state.isDirty = true;
            // Select corresponding answer
            state.answers.map((answer) => {
                if(answer.questionId == action.payload.questionId)
                {
                    answer.answerId = action.payload.answerId;
                }
            })
        },
        setSubmissionDirty(state, action)
        {
            state.isDirty = action.payload.value;
        }
    }
});

export const { setupSubmission, selectSubmissionAlternative, setSubmissionDirty } = submissionSlice.actions;
export const submissionReducer = submissionSlice.reducer;