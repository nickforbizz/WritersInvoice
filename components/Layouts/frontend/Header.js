/* eslint-disable @next/next/no-css-tags */
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Header() {
  return (
      <>
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>WritersInvoice</title>


          {/* <!-- Bootstrap CSS only --> */}
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" 
              integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous" />

          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" />

          {/* <!-- FontAwesome CSS only --> */}
          {/* <link href="/assets/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet" crossOrigin="anonymous" /> */}

          {/* <!-- Site Css --> */}
          <link rel="stylesheet" href="/assets/css/main.css" />



        </Head>


        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
                <Link href={'/'}>
                  <a className="navbar-brand">WritersInvoice</a>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                <div className="navbar-nav ">
                    <Link href={'/'}>
                      <a className="nav-link active" aria-current="page">Home</a>
                    </Link>
                    <Link href={'#about'}>
                      <a className="nav-link">About</a>
                    </Link>
                    <Link href={'#contact'}>
                      <a className="nav-link">Contact</a>
                    </Link>
                    <Link href={'/signup'}>
                      <a className="nav-link">SignUp</a>
                    </Link>
                </div>
                </div>
            </div>
        </nav>

        
      </>
  )
}
