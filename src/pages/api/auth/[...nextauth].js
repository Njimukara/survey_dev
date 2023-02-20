import axios from 'axios'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
export const authOptions = {
  secret: process.env.NextAuth_SECRET,
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      id: 'Credentials',
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'Enter email',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter Password',
        },
      },

      async authorize(credentials, req) {
        const { email, password } = credentials
        const body = {
          email: email,
          password: password,
        }
        let respond, error, user
        await axios
          .post(
            'https://surveyplanner.pythonanywhere.com/auth/token/login/',
            body
          )
          .then((res) => {
            respond = res
          })
          .catch((err) => {
            error = err
          })
        if (respond.statusText == 'OK') {
          console.log(respond.data.auth_token)

          const config = {
            headers: { Authorization: `Token ${respond.data.auth_token}` },
          }
          await axios
            .get(
              'https://surveyplanner.pythonanywhere.com/auth/users/me/',
              config
            )
            .then((res) => {
              // console.log(res.data)
              user = res.data
            })
            .catch((err) => {
              console.log(err)
            })
          console.log(user)
          return user
        }
        return null
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token
      return session
    },
  },
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
}
export default NextAuth(authOptions)
