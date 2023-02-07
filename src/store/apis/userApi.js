import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005'
    }),
    endpoints(builder){
        return{
            fetchUser: builder.query({
                query: (email) => {
                    return{
                        url: '/users',
                        params: {
                            email: email
                        },
                        method: 'GET',
                    };
                }
            }),
            uploadUser: builder.mutation({
                query: (user) => {
                    return{
                        url: `/users/${user.id}`,
                        body: {
                            id: user.id,
                            email: user.email,
                            questionsId: user.questionsId,
                            confirmedMail: user.confirmedMail,
                            submitedExam: user.submitedExam,
                            startedExam: user.startedExam,
                            examStartTime: user.examStartTime
                        },
                        method: 'PATCH',
                    };
                }
            })
        };
    }
})

export const { useLazyFetchUserQuery, useUploadUserMutation } = userApi;
export { userApi };