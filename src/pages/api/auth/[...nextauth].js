import axios from "axios";
import axiosConfig from "axiosConfig";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const authOptions = (req) => ({
  secret: process.env.NEXTAUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      id: "Credentials",
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
        remember: {
          label: "Remember me",
          type: "checkbox",
        },
      },

      async authorize(credentials, req) {
        const { email, password, remember } = credentials;
        const body = {
          email: email,
          password: password,
        };
        let respond, error;
        let user = {};
        await axiosConfig
          .post(`/auth/token/login/`, body)
          .then((res) => {
            respond = res;
          })
          .catch((err) => {
            error = err;
          });

        if (respond) {
          if (respond.status == 200) {
            const config = {
              headers: { Authorization: `Token ${respond.data.auth_token}` },
            };
            await axiosConfig
              .get(`/auth/users/me/`, config)
              .then((res) => {
                console.log("res", res);
                user.data = res.data;
                user.auth_token = respond.data.auth_token;
                return user;
              })
              .catch((err) => {
                console.log("err", err);
                throw new Error(
                  JSON.stringify({
                    errors: "Server error, please try again later",
                    status: false,
                  })
                );
              });
          } else {
            // console.log("this is strange", respond);
            throw new Error(
              JSON.stringify({
                errors: "Server error, please try again later",
                status: false,
              })
            );
          }
          return {
            ...user,
            remember: remember ? true : false,
          };
        }
        throw new Error(
          JSON.stringify({
            errors: "Incorrect Email or Password",
            status: false,
          })
        );
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (req.url === "/api/auth/session?update") {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        await axiosConfig
          .get("/auth/users/me/")
          .then((res) => {
            token.data = res.data;
          })
          .catch((err) => {
            throw new Error(
              JSON.stringify({
                errors: "Server error, please try again later",
                status: false,
              })
            );
          });
      }
      if (user && user.remember) {
        // Extend the expiration time of the token for "remembered" users
        token.expires = Date.now() + 5 * 24 * 60 * 60 * 1000; // 5 days in milliseconds
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token;
      return session;
    },
  },
  session: {
    // Set to jwt in order for CredentialsProvider to work properly
    strategy: "jwt",
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 10 * 60, // 10 mins
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
});
// export default NextAuth(authOptions);
const NextAuthFunction = async (req, res) => {
  return NextAuth(req, res, authOptions(req));
};

export default NextAuthFunction;
