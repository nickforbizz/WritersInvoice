import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import logger from "../../../services/logger";
const { User } = require('../../../models');

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

  // jwt : {
  //     encription: true,
  // },
//   secret: process.env.SECRET,
  callbacks: {
        async jwt(token, account) {
          if (account ?.accessToken) {
              token.accessToken = account.accessToken
          }
          return token;
        },

        jwt: async ({ token, user }) => {
          
          user && (token.user = user)

          // save user to DB
          if (token && token.user) {
            try {
              let auth_user = token.user;
              let email =  auth_user.email;
              let db_user = await User.findOne({ where: { email }});


              if (!db_user) {
                const [fname, lname] = auth_user.name.split(' ');
                const [email_name, third_party_name] = auth_user.email.split('@');

                let payload = {
                  fname, lname, email,
                  password: email_name,
                  is_third_party_access: true,
                  third_party_name
                }

                await User.create(payload);
              }   

            } catch (error) {
              logger.error(error.stack)
            }
          }

          return token
        },

        // session: async ({ session, token, user }) => {
        //     session.user = token.user
        //     return session
        // },
        // redirect: async (url, _baseUrl)=>{
        //     console.log('url');
        //     if (url === '/') {
        //         console.log({url});
        //         console.log('xxx');
        //         return Promise.resolve('/Dashboard')
        //     }else{
        //         console.log({url});
        //         console.log('xxxxxxxxx');
        //         return  Promise.resolve('/Dashboard/accounts')
        //     }
        
        // },


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