import React from 'react'
import Script from 'next/script'




export default function Footer() {
  return (
    <>
        <footer className="box-shadow">
              <div className="container">
                  <div className="row">
                      <div className="col-md-4">
                          <div className="mt-5 p-3 text-center">
                              <h3 className="display-5">WritersInvoice</h3>
                              <p className="text-muted font-monospace">We track every order for easier computation, backtracking and startistics of a given period </p>
                          </div>
                      </div>

                      <div className="col-md-8 mt-5">
                          <div className="mt-3 p-3">
                              <div className="social text-center">
                                  <i className="fa fa-twitter" aria-hidden="true"></i>
                                  <i className="fa fa-instagram" aria-hidden="true"></i>
                                  <i className="fa fa-facebook-official" aria-hidden="true"></i>
                                  <hr />
                              </div>

                              <div className="contact_details mt-5">
                                  <div className="row">
                                      <div className="col-2"><i className="fa fa-phone contact_details-icon" aria-hidden="true"></i></div>
                                      <div className="col-10">
                                          <p><b>Lets Talk</b></p>
                                          <p className="text-muted contact_details-info"> +254 707722247 </p>
                                      </div>
                                  </div>

                                  <div className="row">
                                      <div className="col-2"><i className="fa fa-envelope-o contact_details-icon" aria-hidden="true"></i></div>
                                      <div className="col-10">
                                          <p><b>General Support</b></p>
                                          <p className="text-muted contact_details-info"> info@mkenyadaima.com </p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-12 text-center p-3 bg-light">© 2022 Mkenyadaima.co.ke </div>
        </footer>

        {/* <!-- Bootstrap JavaScript Bundle with Popper --> */}
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossOrigin="anonymous" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"  />
        {/* <!-- Site Js --> */}
        <Script src="/assets/js/main.js" />
    </>
  )
}
