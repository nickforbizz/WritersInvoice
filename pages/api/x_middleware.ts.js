// import { NextResponse } from 'next/server'
import { User } from '../../models'


export async function middleware(req) {
  const basicAuth = req.headers.get('authorization')
  if (basicAuth) {
    const auth = basicAuth.split(' ')[1]
    const [email, password] = Buffer.from(auth, 'base64').toString().split(':')
    const db_user = User.findOne({where: {email}})

    if(db_user){
        const valid_password = await db_user.validPassword(password, db_user.password);
        if (valid_password) {
            return NextResponse.next()           
        }

      }
    
  }


  return new Response("Auth Required",{
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}