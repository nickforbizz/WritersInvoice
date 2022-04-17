
import { SessionProvider } from "next-auth/react";
import '../styles/globals.css'
import frontedlayout from '../components/Layouts/frontend/frontedlayout'
import dashboardlayout from '../components/Layouts/dashboard/dashboardlayout'


const layouts = {
  frontedLayout: frontedlayout,
  dashboardLayout: dashboardlayout,
};
const MyApp = ({ Component, pageProps: { session, ...pageProps }  }) => {
  const Layout = layouts[Component.layout] || ((children) => <>{children}</>);
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
