import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <title>WritersInvoice Dashboard</title>
            <meta content='width=device-width, initial-scale=1.0, shrink-to-fit=no' name='viewport' />
            <link rel="icon" href="/dashboard/assets/img/icon.ico" type="image/x-icon"/>
            <link rel="stylesheet" href="/dashboard/assets/font-awesome-4.7.0/css/font-awesome.min.css"/>

            

            {/* <!-- CSS Files --> */}
            <link rel="stylesheet" href="/dashboard/assets/css/bootstrap.min.css" />
            <link rel="stylesheet" href="/dashboard/assets/css/atlantis.min.css" />
            <link rel="stylesheet" href="/dashboard/assets/css/toastr.min.css" />

            {/* <!-- CSS Just for demo purpose, don't include it in your project --> */}
            <link rel="stylesheet" href="/dashboard/assets/css/demo.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}