
import { SessionProvider } from "next-auth/react";
import '../styles/globals.css'
import frontedlayout from '../components/Layouts/frontend/frontedlayout'
import dashboardlayout from '../components/Layouts/dashboard/dashboardlayout'
import axios from "axios";


const layouts = {
  frontedLayout: frontedlayout,
  dashboardLayout: dashboardlayout,
};


const MyApp = ({ Component, pageProps: { session, ...pageProps }  }) => {
  const Layout = layouts[Component.layout] || ((children) => <>{children}</>);

  axios.interceptors.request.use(function (config) {
    config.headers.Authorization = process.env.SECRET;
    config.headers.api_token = process.env.SECRET;
    return config;
  });


  return (
    <SessionProvider session={session}>
      <Layout>
        <main>
          <Component {...pageProps} />
        </main>
      </Layout>
    </SessionProvider>
      )
}

export default MyApp
