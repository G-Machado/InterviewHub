import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const submissionsApi = createApi({
    reducerPath: 'submissions',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005'
    }),
    endpoints(builder){
        return{
            fetchSubmission: builder.query({
                query: (user) => {
                    return{
                        url: '/submissions',
                        params: {
                            id: user.id || 0
                        },
                        method: 'GET',
                    };
                }
            }),
            postSubmission: builder.mutation({
                query: (submission) => {
                    return{
                        url: '/submissions',
                        body: {
                            id: submission.userId,
                            answers: submission.answers
                        },
                        method: 'POST',
                    };
                }
            }),
            updateSubmission: builder.mutation({
                query: (submission) => {
                    return{
                        url: `/submissions/${submission.id}`,
                        body: {
                            id: submission.id,
                            answers: submission.answers
                        },
                        method: 'PATCH',
                    };
                }
            })
        };
    }
})

export const { useLazyFetchSubmissionQuery, usePostSubmissionMutation, useUpdateSubmissionMutation } = submissionsApi;
export { submissionsApi };