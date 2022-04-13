import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // authorization: {
        //     params: {
        //       prompt: "consent",
        //       access_type: "offline",
        //       response_type: "code"
        //     }
        //   }
    }),
    // ...add more providers here
  ],

  pages: {
    signIn: "/auth/signin",
  },

//   jwt : {
//       encription: true,
//   },
//   secret: process.env.SECRET,
  callbacks: {
        // async jwt(token, account) {
        // if (account ?.accessToken) {
        //     token.accessToken = account.accessToken
        // }
        // console.log({token});
        // return token;
        // },
        // jwt: async ({ token, user }) => {
        //     user && (token.user = user)
        //     return token
        // },
        // session: async ({ session, token, user }) => {
        //     session.user = token.user
        //     return session
        // },
        // redirect: async (url, _baseUrl)=>{
        //     console.log('url');
        //     if (url === '/') {
        //         console.log({url});
        //         return Promise.resolve('/Dashboard')
        //     }else{
        //         console.log({url});
        //         console.log('xxxxxxxxx');
        //         return  Promise.resolve('/Dashboard/accounts')
        //     }
        
        // }


        async session({ session, token, user}) {
            session.user.username = session.user.name
              .split(" ")
              .join("")
              .toLocaleLowerCase();
      
            session.user.uid = token.sub;
            return session;
        }
    }
});