import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import api from "services/api";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email", value: "" },
        password: { label: "Password", type: "password", placeholder: "password", value: '' }
      },
      async authorize(credentials, req) {

        if (!credentials) return null;

        const access = {
          grant_type: 'password',
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          email: credentials.email,
          password: credentials.password,
        }

        // Add logic here to look up the user from the credentials supplied
        const { data } = await api.post('/api/admin/login', access)
       
        const { token_type, access_token } = data

        api.defaults.headers.common.Accept = 'application/json';
        api.defaults.headers.common.Authorization = `${token_type} ${access_token}`;

        const { data: user } = await api.get('/api/admin/me')

        user.access_token = access_token
        user.token_type = token_type
        user.image = `${process.env.CLIENT_STORAGE_URL}/${user.avatar}`

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })

    // ...add more providers here
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`

      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url

      return baseUrl
    },
    async jwt({ token, user, account, profile, isNewUser }) {

      if (user) {
        token.accessToken = user.access_token
        token.id = user.id
      }

      return token
    },
    async session({ session, token, user }) {

      session.accessToken = token.accessToken
      session.user.id = token.id

      return session;
    },

  },
  secret: process.env.NEXTAUTH_SECRET,
  logger: {
    error(code, metadata) {
      // alert('cek')
      console.error(code, metadata)
    },
    warn(code) {
      console.warn(code)
    },
    debug(code, metadata) {
      console.debug(code, metadata)
    }
  },
  pages: {
    signIn: '/pages/auth/sign-in',

    // signOut: '/pages/',
    error: '/pages/auth/sign-in', // Error code passed in query string as ?error=
  }
}

export default NextAuth(authOptions)
