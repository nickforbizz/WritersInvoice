/* eslint-disable @next/next/no-css-tags */

import { useRouter } from 'next/router';
import { getCsrfToken } from "next-auth/react"
import 'fontawesome-4.7';
import axios from 'axios';
import { useForm } from "react-hook-form";

// components
import Image from 'next/image'
import Link from 'next/link';
import toastr from 'toastr';
import { env } from '../next.config';

const  SignIn = ({ csrfToken }) => {

const router = useRouter()
const BACKEND_URL = env.BACKEND_URL
const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
const onSubmit = data => {
      
      try {
          axios.post(`${BACKEND_URL}/user`, data)
          .then(function (response) {
            reset();
            let res = response.data;
            if (res && response.status == 201) {
                toastr.success(res.msg, 'User Registration');
                toastr.success("redirecting to login page", 'User Registration');
                setTimeout(() => {
                    router.push('/')
                }, 2000);
            } else {
                toastr.error(res.msg, 'User Registration')
            }
          })
          .catch(function (error) {
            toastr.success("something went wrong", 'User Registration');        
            console.log(error);
          });
          
      } catch (error) {
        // logger.error(error.stack) 
      }
}

  return (
    <>
     
        <section className="pt-5 home_banner clipPath ">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">

                        <div className="card box-shadow p-5 mt-1 mb-5">
                            <form className="form row" onSubmit={handleSubmit(onSubmit)}>
                                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">First Name</label>
                                    <input type="text" className="form-control" id="signUp_fname" 
                                            placeholder="Enter here"
                                            {...register("fname", { required: true })} />
                                    {errors.fname && <span className='red'>This field is required</span>}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Last Name</label>
                                    <input type="text" className="form-control" id="signUp_lname" 
                                            placeholder="Enter here" 
                                            {...register("lname", { required: true })} />
                                    {errors.lname && <span className='red'>This field is required</span>}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" autoComplete="true" className="form-control" id="signUp_password" 
                                            placeholder="your password" 
                                            {...register("password", { required: true })} />
                                    {errors.password && <span className='red'> This field is required</span> }
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Confirm Password</label>
                                    <input type="password" autoComplete="true" className="form-control" id="signUp_password_confirm" 
                                            placeholder="your password" 
                                            {...register("password_confirm", { required: true,
                                                validate: (val) => {
                                                if (watch('password') != val) {
                                                  return "Your passwords do not match";
                                                }
                                              }, })} />

                                    {(errors.password_confirm?.message) ? <span className='red'> {errors.password_confirm?.message} </span> : 
                                    errors.password_confirm && <span className='red'>This field is required</span>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="signUp_email" 
                                            placeholder="name@example.com" 
                                            {...register("email", { required: true })} />
                                    {errors.email && <span className='red'>This field is required</span>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Mobile</label>
                                    <input type="number" className="form-control" id="signUp_tel" 
                                            placeholder="(07xx..) or (01xx..)" 
                                            {...register("mobile", { required: true, minLength: {
                                                value: 7,
                                                message: "Enter atleast 7 characters"
                                              } })} />

                                    {(errors.mobile?.message) ? <span className='red'> {errors.mobile?.message} </span> : 
                                    errors.mobile && <span className='red'>This field is required</span>}
                                </div>

                                <div className="mb-3">
                                    <hr />
                                    <input type="submit" className="btn btn-sm btn-primary btn-round-custom input-submit" value="Sign Up" />
                                    <Link href={'/'}>
                                        <a className="btn btn-primary btn-round-custom pull-right"> login</a>
                                    </Link>
                                    <hr />
                                </div>
                            </form>

                            <p className="text-muted text-justified text-center" >Click to register your user account </p>
                        </div>
                        {/* .card .box-shadow */}

                    </div>
                    {/* .col-md-6 */}


                    <div className="col-md-6">
                        <div className="..card xp-5 xmt-5">
                            <Image layout='responsive' width={'100%'} height={"80%"} src="/assets/imgs/heroimg.png"  className="card-img-top" alt="creative" />
                        </div>
                    </div>
                    {/* .col-md-6 */}


                </div>
                {/* <!-- .row --> */}
            </div>
            {/* <!-- .container --> */}
        </section>

    </>
  )
}


export async function getServerSideProps(context) {
    const csrfToken = await getCsrfToken(context)
    return {
        props: { csrfToken },
    }
}


SignIn.layout = "frontedLayout"
export default SignIn;
