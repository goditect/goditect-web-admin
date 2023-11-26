import { apiSlice } from "../api/apiSlice";
import { UserLoggedIn } from "./authSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result?.data) {
            // save user data into localStorage
            localStorage.setItem(
              "auth",
              JSON.stringify({
                accessToken: result?.data.accessToken,
                user: result?.data.user,
              })
            );

            // save data in redux store

            dispatch(
              UserLoggedIn({
                accessToken: result.data.accessToken,
                user: result.data.user,
              })
            );
          }
        } catch (err) {
          //
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
