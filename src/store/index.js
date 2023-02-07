import { configureStore } from '@reduxjs/toolkit';
import { navigationReducer, loadPath, changePath } from './slices/navigationSlice';
import { changeUser, setUserField, userReducer } from './slices/userDataSlice';
import { loadQuestionsData, questionsReducer, selectQuestionAlternative } from './slices/questionsSlice';
import { setupSubmission, submissionReducer, selectSubmissionAlternative, setSubmissionDirty } from './slices/submissionSlice';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { textsApi } from './apis/textsApi';
import { questionsApi } from './apis/questionsApi';
import { userApi } from './apis/userApi';
import { submissionsApi } from './apis/submissionsApi';

const store = configureStore(
{
    reducer: {
        navigation: navigationReducer,
        userData: userReducer,
        questionsData: questionsReducer,
        submissionData: submissionReducer,
        [textsApi.reducerPath]: textsApi.reducer,
        [questionsApi.reducerPath]: questionsApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [submissionsApi.reducerPath]: submissionsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>{
        return getDefaultMiddleware()
            .concat(textsApi.middleware)
            .concat(questionsApi.middleware)
            .concat(userApi.middleware)
            .concat(submissionsApi.middleware);
    }

});

setupListeners(store.dispatch);

const LOGIN_PAGE_PATH = "/applicantLogin";
const CONFIRM_PAGE_PATH = "/confirmExam";
const QUESTIONS_PAGE_PATH = "/examQuestions";
const SUBMIT_PAGE_PATH = "/examSubmit";
const WAIT_PAGE_PATH = "/waitResults";

export { LOGIN_PAGE_PATH, CONFIRM_PAGE_PATH, QUESTIONS_PAGE_PATH, SUBMIT_PAGE_PATH, WAIT_PAGE_PATH }
export { useFetchTextQuery } from './apis/textsApi';
export { useLazyFetchQuestionsQuery } from './apis/questionsApi';
export { useLazyFetchUserQuery, useUploadUserMutation } from './apis/userApi';
export { usePostSubmissionMutation, useLazyFetchSubmissionQuery, useUpdateSubmissionMutation } from './apis/submissionsApi';
export { 
    loadPath, 
    changePath,  
    changeUser, 
    setUserField,
    loadQuestionsData,
    selectQuestionAlternative,
    selectSubmissionAlternative,
    setSubmissionDirty,
    setupSubmission,
    store
};