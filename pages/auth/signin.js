import React from 'react'
import { getSession, getCsrfToken, getProviders, signIn, signIn as SignIntoProvider } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import toastr from 'toastr';


const SignIn = ({ csrfToken, providers }) => {
  const router = useRouter()
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const onSubmit = async (data,e) => {
    e.preventDefault()
    let response = await signIn("credentials",{redirect: false, ...data});
    if(response.status == 200){
      toastr.success("Redirecting to dashboard page", 'User Login');
      toastr.success("Success Login", 'User Login');
      setTimeout(() => {
        router.push('/Dashboard');
      }, 2000);
    }else{
      toastr.success("Error while trying to Login <br/> Invalid email password combination", 'User Login');
    }
    reset();
    // SignIntoProvider('EmailPassword', { callbackUrl: "/Dashboard"})
}
  return (
    <div className='fitted-content'>
        <div className="center-div">
          <div className="card p-5 mt-5">
                <form className="form " onSubmit={handleSubmit(onSubmit)}>
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" id="login_email" 
                                placeholder="name@example.com" 
                                {...register("email", { required: true })} />
                        {errors.email && <span className='red'>This field is required</span>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" autoComplete="true" className="form-control" id="login_password" 
                                placeholder="your password" 
                                {...register("password", { required: true })} />
                        {errors.password && <span className='red'>This field is required</span>} 
                    </div>
                    {/* <div className="mb-3">
                        <label className="form-label">Select Account</label>
                        <select className="form-select" aria-label="Default select example" id="select-acc">
                            <option selected value="">Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div> */}
                    <div className="mb-3">
                        <hr />
                        <input type="submit" className="btn  btn-primary btn-block btn-round-custom input-submit" value="Submit" />
                        {/* <button className="btn btn-primary btn-round-custom pull-right" onClick={() => signIn()}>Google login</button> */}
                        <hr />
                    </div>
                </form>

                <div className="providers">
                  {Object.values(providers).map((provider) => {
                      if(provider.name === 'EmailPassword') {
                          return 
                      }else{
                        return  <div key={provider.name} className=''>
                                  <button onClick={() => SignIntoProvider(provider.id, { callbackUrl: "/Dashboard"})}
                                      className="btn btn-primary btn-round-custom">
                                      Sign in with {provider.name}
                                  </button>
                                </div>
                      }
                  })}

                </div>
                <p className="text-muted text-justified text-center" >Click to sign into your user account </p>
            </div>

        </div>
    </div>

   
  );
}


export async function getServerSideProps(context) {
  const get_session = await getSession(context);
  console.log({get_session});
  return { 
      props: { 
        providers: await getProviders(context), 
        csrfToken: await getCsrfToken(context) 
      } 
  };
}


SignIn.layout = "frontedLayout"
export default SignIn;