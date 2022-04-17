import React from 'react'
import { getProviders, signIn as SignIntoProvider } from "next-auth/react";


const SignIn = ({ providers }) => {
  return (
    <div className='fitted-content'>
        <div className="center-div">
            <div className="card p-5 mt-5" >
                <div className=''>
                    {Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                          <button onClick={() => SignIntoProvider(provider.id, { callbackUrl: "/Dashboard"})}
                              className="btn btn-primary btn-round">
                              Sign in with {provider.name}
                          </button>
                        </div>
                    ))}

                    <hr/>
                    <p className="text-muted text-justified text-center" >Click to sign into your user account </p>
                </div>

            </div>
        </div>
    </div>

   
  );
}
export async function getServerSideProps(context) {
  return { props: { providers: await getProviders(context) } };
}


SignIn.layout = "frontedLayout"
export default SignIn;