import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_CLIENT_ID,
      clientSecret: process.env.NEXT_SECRET_ID,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        firstName: { label: "First Name", type: "text" },
        lastName: { label: "Last Name", type: "text" },
        password: { label: "Password", type: "password" },
        isRegister: { label: "Register", type: "boolean", value: "false" }, // Flag to differentiate between login and registration
      },
      async authorize(credentials) {
        try {
          const url =
            credentials.isRegister === "true"
              ? "http://127.0.0.1:8000/accounts/api/register/" // Django Register API
              : "http://127.0.0.1:8000/accounts/api/login/"; // Django Login API

          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              first_name: credentials.firstName,
              last_name: credentials.lastName,
              password: credentials.password,
            }),
          });

          const data = await response.json();

          console.log(response);
          console.log(data);

          if (response.ok && data.access) {
            return {
              accessToken: data.access,
              refreshToken: data.refresh,
              email: data.user.email,
              first_name: data.user.first_name,
              last_name: data.user.last_name,
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && account.provider === "google") {
        // For Google OAuth tokens
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      if (user) {
        // Store accessToken and refreshToken from credentials login
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.email = user.email;
        token.firstName = user.first_name;
        token.lastName = user.last_name;
      }
      console.log(token);
      return token;
    },
    async session({ session, token }) {
      // Make session contain JWT accessToken, refreshToken, and user details
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user.email = token.email;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.idToken = token.idToken;
      return session;
    },
    // async redirect({ url, baseUrl }) {
    //   return Promise.resolve("/");
    // },
  },
  pages: {
    signIn: "/auth/login", // Your custom login page
  },
});
