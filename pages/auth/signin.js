import React from 'react'
import { getProviders, signIn as SignIntoProvider } from "next-auth/react";


const SignIn = ({ providers }) => {
  return (
    <div className=''>
        <div className="d-flex align-self-center  my-auto">
            <div className="card p-5 mt-5 ml-5" >
                <div className='mt-5 '>
                    {Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                        <button onClick={() => SignIntoProvider(provider.id, { callbackUrl: "/Dashboard"})}
                            className="btn btn-info">
                            Sign in with {provider.name}
                        </button>
                        </div>
                    ))}
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