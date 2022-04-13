import React from 'react'
import Head from 'next/head'

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

          {/* <!-- FontAwesome CSS only --> */}
          {/* <link href="/assets/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet" crossOrigin="anonymous" /> */}

          {/* <!-- Site Css --> */}
          <link rel="stylesheet" href="/assets/css/main.css" />



        </Head>


        <nav className="navbar navbar-expand-lg navbar-light bg-info">
            <div className="container">
                <a className="navbar-brand" href="#">WritersInvoice</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                <div className="navbar-nav ">
                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                    <a className="nav-link" href="#about">About</a>
                    <a className="nav-link" href="#contact">Contact</a>
                </div>
                </div>
            </div>
        </nav>

        
      </>
  )
}
