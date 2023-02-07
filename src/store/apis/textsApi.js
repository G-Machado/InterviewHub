import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const textsApi = createApi({
    reducerPath: 'texts',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005'
    }),
    endpoints(builder){
        return{
            fetchText: builder.query({
                query: (tag) => {
                    return{
                        url: '/texts',
                        params: {
                            tag: tag
                        },
                        method: 'GET',
                    };
                }
            })
        };
    }
})

export const { useFetchTextQuery } = textsApi;
export { textsApi };