import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const questionsApi = createApi({
    reducerPath: 'questions',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005'
    }),
    endpoints(builder){
        return{
            fetchQuestions: builder.query({
                query: () => {
                    return{
                        url: '/questions',
                        method: 'GET',
                    };
                }
            })
        };
    }
})

export const { useLazyFetchQuestionsQuery } = questionsApi;
export { questionsApi };