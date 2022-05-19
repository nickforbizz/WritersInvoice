// import React from 'react'
import  Axios  from 'axios'
import React from 'react'
import { useForm } from "react-hook-form";
import { getCsrfToken } from "next-auth/react"
// import MUIDataTable from "mui-datatables";
import toastr from 'toastr';
const Orders = ({accounts, csrfToken}) => {
  return (
    <>
        <div className="content">

            <div className="panel-header bg-primary-gradient">
                <div className="page-inner py-5">
                    <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row">
                        <div>
                            <h2 className="text-white pb-2 fw-bold">Dashboard / Orders</h2>
                            <h5 className="text-white op-7 mb-2">Monitor and manage you Orders</h5>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>
  )
}


Orders.getInitialProps = async (context) => {
    const csrfToken = await getCsrfToken(context);
    const fetch_accs_url = process.env.BACKEND_URL+'/account';
    const {accounts} = await Axios.get(fetch_accs_url);

    return {
        accounts, csrfToken
    }
}

Orders.layout = "dashboardLayout"
export default Orders