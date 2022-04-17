/* eslint-disable @next/next/no-css-tags */

import Image from 'next/image'
import 'fontawesome-4.7';
import { useRouter } from 'next/router';
import { useSession, signIn } from "next-auth/react"

import styles from '../styles/Home.module.css'
import Link from 'next/link';

const  Notauthorized = () => {

  const router = useRouter()

  const handleLogin = (e) => {
    e.preventDefault()
    router.push('/Dashboard/')
  }
  return (
    <>
     
        <section className="pt-5 home_banner clipPath ">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">

                        <div className="mt-5 p-3">
                            <h1 className="display-4">Thanks for Visiting us</h1>
                            <p className="text-muted font-monospace">Unfortunetely, you cannot access the Dashboard at moment <br />
                            Contact Admin to Activate your account.</p>

                            <div>
                                <Link href={'/'}>
                                    <a className="btn btn-md btn-primary btn-round-custom" >login</a>
                                </Link>
                                <button className="btn btn-md btn-primary btn-round-custom pull-right" onClick={() => signIn()}>Google login</button>
                            </div>

                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="..card xp-5 xmt-5">
                            {/* <img className="" src='/assets/imgs/carflat.png' alt='notauthorized image' /> */}
                            <Image layout='responsive' width={'100%'} height={"80%"} src="/assets/imgs/carflat.png"  className="card-img-top" alt="creative" />
                        </div>
                    </div>
                </div>
                {/* <!-- .row --> */}
            </div>
            {/* <!-- .container --> */}
        </section>

    </>
  )
}

Notauthorized.layout = "frontedLayout"
export default Notauthorized;
