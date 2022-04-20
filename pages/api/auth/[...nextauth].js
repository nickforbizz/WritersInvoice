import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
const bcrypt = require('bcrypt');

import logger from "../../../services/logger";
const { User } = require('../../../models');

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code"
            }
          }
    }),
    Credentials({
      name: 'EmailPassword',
      credentials: {
        email : {
          label: 'Email',
          type: 'email',
          placeholder: 'name@example.com',
        },
        password : {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials){
        // with credentials, find if user is in DB
        const email = credentials.email;
        const password = credentials.password;
        const user = await User.findOne({where: {email,}});

        if(user){
          const valid_password = await user.validPassword(password, user.password);
          if (valid_password) {
            return user;            
          }

        }
      }
    }),
    // ...add more providers here
  ],

  pages: {
    signIn: "/auth/signin",
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user'
  },

  jwt : {
      encription: true,
  },
  secret: process.env.SECRET,
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
              let profile =  auth_user.image;
              let db_user = await User.findOne({ where: { email }});

              if (!db_user) {
                const [fname, lname] = auth_user.name.split(' ');
                const [email_name, third_party_name] = auth_user.email.split('@');

                let payload = {
                  fname, lname, email,
                  password: email_name,
                  is_third_party_access: true,
                  third_party_name,
                  profile
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
          // GOOGLE user
          if (session.user.username) {
            session.user.username = session.user.name.split(" ").join("").toLocaleLowerCase();
            session.user.uid = token.sub;
          }
          
          // DB user
          if (token.user && token.user.password) {
            session.user.uid = token.sub;
            session.user.username = token.email.split("@")[0];
            session.user.name = token.user.fname +' '+token.user.lname;
            session.user.image = token.user.profile;
          }

      
            return session;
        }
    }
});