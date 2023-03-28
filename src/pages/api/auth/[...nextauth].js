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
        let respond, error
        let user = {}
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
        console.log(error)
        if (respond.status == 200) {
          const config = {
            headers: { Authorization: `Token ${respond.data.auth_token}` },
          }
          await axios
            .get(
              'https://surveyplanner.pythonanywhere.com/auth/users/me/',
              config
            )
            .then((res) => {
              user.data = res.data
              user.auth_token = respond.data.auth_token
            })
            .catch((err) => {})
          return user
        } else if (error.response.status) {
          return null
        }
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token
      return session
    },
  },
  session: {
    // Set to jwt in order for CredentialsProvider to work properly
    strategy: 'jwt',
    // Seconds - How long until an idle session expires and is no longer valid.
  maxAge: 10 * 60, // 10 mins
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
}
export default NextAuth(authOptions)
