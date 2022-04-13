/* eslint-disable @next/next/no-css-tags */

import Image from 'next/image'
import 'fontawesome-4.7';
import { useRouter } from 'next/router';
import { useSession, signIn } from "next-auth/react"

import styles from '../styles/Home.module.css'

const  Home = () => {

  const router = useRouter()

  const handleLogin = (e) => {
    e.preventDefault()
    router.push('/Dashboard/')
  }
  return (
    <>
      
          <main>
              
              
              <section className="pt-5 home_banner clipPath ">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">

                                <div className="mt-5 p-3">
                                    <h1 className="display-4">Wellcome to WritersInvoice</h1>
                                    <p className="text-muted font-monospace">We track every order for easier computation, backtracking and startistics of a given period </p>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="card p-5 mt-5">
                                    {/* <form className="form " onSubmit={handleLogin}>
                                        <div className="mb-3">
                                            <label className="form-label">Email address</label>
                                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Select Account</label>
                                            <select className="form-select" aria-label="Default select example" id="select-acc">
                                                <option selected value="">Open this select menu</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <input type="submit" className="form-control btn btn-primary" id="check_userInAcc" value="Submit" />
                                        </div>
                                    </form> */}

                                    <p className="text-muted text-justified text-center" >Click to sign into your user account </p>
                                    <button className="form-control btn btn-primary" onClick={() => signIn()}>Sign in</button>
                                </div>
                            </div>
                        </div>
                        {/* <!-- .row --> */}
                    </div>
                    {/* <!-- .container --> */}
              </section>





                <section className="pt-5 mb-5 about_banner" id="about">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h2 className="display-6 text-center">Why Use WritersInvoice</h2>
                                <p className="text-center text-muted font-monospace">Let us help you with tracking and proper management of writes orders so you can focus on other things</p>
                            </div>
                        </div>
                        {/* <!-- .row --> */}

                        <div className="row">
                            <div className="col-md-4">
                                <div className="card box-shadow">
                                    <Image layout='responsive' width={'100%'} height={"50%"} src="/assets/imgs/creative.jpg"  className="card-img-top" alt="creative" />
                                    <div className="card-body">
                                        <h5 className="card-title">Analytics</h5>
                                        <p className="card-text text-muted">With accumalated data for a given period of time, we can be able to analyze and advise on your stregths and weaknesses. 
                                          This will assist to improve your productivity and better yields </p>
                                    </div>
                                  </div>
                            </div>

                            <div className="col-md-4">
                                <div className="card box-shadow">
                                    <Image layout='responsive' width={'100%'} height={"50%"} src="/assets/imgs/art.jpg" className="card-img-top" alt="art" />
                                    <div className="card-body">
                                        <h5 className="card-title">Easier Computation</h5>
                                        <p className="card-text text-muted">At a glance you can tell the productivity of your writers. You can set the Cycle where you verify what a writer has worked on.
                                            You can action on that data together with the writer to avoid any confusion</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="card box-shadow">
                                    <Image layout='responsive' width={'100%'} height={"50%"} src="/assets/imgs/partners.jpg" className="card-img-top" alt="partners" />
                                    <div className="card-body">
                                        <h5 className="card-title">Increased Productivity</h5>
                                        <p className="card-text text-muted">Get to know when and how many orders a writer has worked on. Track any challanging order that may have occured and discuss the solution to be adopted future reference. Add the issues for future reference </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- .row --> */}

                    </div>
                    {/* <!-- .container --> */}
                </section>
                {/* <!-- #about --> */}




                <section className="pt-5 mb-5 clipPath_contact contact_banner" id="contact">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h2 className="display-6 text-center">We Value your Feedback</h2>
                                <p className="text-center text-muted font-monospace">Help us improve and give you better services by leaving us a complaint, suggestion or some appreciation</p>
                            </div>
                        </div>
                        {/* <!-- .row --> */}



                        <div className="row">
                            <div className="col-md-7">
                                <div className="card p-5 mt-5 box-shadow">

                                    <form className="form ">
                                        <div className="mb-3">
                                            <label className="form-label">Names</label>
                                            <input type="text" className="form-control" id="names" placeholder="Names" />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Email address</label>
                                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Leave a comment</label>
                                            <textarea name="feedback" className="form-control" id="feedback" cols="15" placeholder="Leave us some feedback"></textarea>                                        
                                        </div>

                                        <div className="mb-3">
                                            <input type="submit" className="form-control btn btn-primary" id="check_userInAcc" Value="Submit" />
                                        </div>
                                    </form>

                                </div>
                            </div>

                            <div className="col-md-5 my-auto">
                                <div className="contact_img">
                                    <Image layout='responsive' width={'100%'} height={'50%'} src="/assets/imgs/art.jpg" className="card-img-top" alt="art" />                              
                                </div>
                            </div>
                        </div>
                        {/* <!-- .row --> */}

                    </div>
                    {/* <!-- .container --> */}
                </section>
                {/* <!-- #contact --> */}


          </main>

    </>
  )
}

Home.layout = "frontedLayout"
export default Home;
