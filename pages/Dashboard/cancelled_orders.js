// import React from 'react'
import  Axios  from 'axios'
import React from 'react'
import { useForm } from "react-hook-form";
import { getCsrfToken } from "next-auth/react"
import MUIDataTable from "mui-datatables";
import { Switch } from '@mui/material';
import { useRouter } from 'next/router';
import SelectField from '../../components/HtmlFields/select';
import moment from 'moment';
import toastr from 'toastr';



const CancelledOrders = ({ orders }) => {
    
    const router = useRouter(); 



    


    const orders_columns = [
        {
            name: '',
            label: '#',
            options: {filter: false,
                customBodyRender : (value, tableMeta, update) => {
                    let rowIndex = Number(tableMeta.rowIndex) + 1;
                    return ( <span>{rowIndex}</span> )
                }
            },
        },
        {name: 'id', label: 'Record ID'},
        {name: 'order_number', label: 'order_number'},
        {name: 'pages', label: 'pages'},
        {name: 'total_pay', label: 'total_pay'},
        {
            name: "status",
            label: 'status',
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    if(value==1){
                        return 'On-progress';
                    }else if(value==2){
                        return 'Revision';
                    }else if(value==3){
                        return 'On-hold';
                    }else if(value==4){
                        return 'Escalated';
                    }else if(value==5){
                        return 'Cancelled';
                    }else{
                        return 'Completed'
                    }
                }
            },
        },
    ];
    const orders_data = orders;
    const options = {
        selectableRows: false
    };
  return (
    <>
        <div className="content">

            <div className="panel-header bg-primary-gradient">
                <div className="page-inner py-5">
                    <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row">
                        <div>
                            <h2 className="text-white pb-2 fw-bold">Dashboard / Cancelled Orders</h2>
                            <h5 className="text-white op-7 mb-2">Monitor and manage you Orders</h5>
                        </div>
                    </div>
                </div>
            </div>
            {/* .panel-header */}


            <div className='page-inner'>
                    <div className='row'>
                        <div className="col-md-12">


                            <div className="card">
                                <div className="card-header">
                                    <div className="d-flex align-items-center">
                                     
                                    </div>
                                </div>

                                <div className="card-body">

                                    {
                                        <MUIDataTable
                                            id="orders_tb"
                                            title={"Cancelled Orders List"}
                                            data={orders_data}
                                            columns={orders_columns}
                                            options={options}
                                        />
                                    }


                                </div>
                                {/* .card-body */}
                            </div>
                            {/* .card */}
                        </div>
                        {/* .col-md-12 */}
                    </div>
                    {/* .row */}
            </div>
            {/* .page-inner */}

        </div>
    </>
  )
}


CancelledOrders.getInitialProps = async (context) => {
    const csrfToken = await getCsrfToken(context);
    const fetch_orders_url = process.env.BACKEND_URL+'/cancelledorder';


    const orders = await Axios.get(fetch_orders_url)
            .then(function (response) {
                if(response && response.data && response.data.data){
                    return response.data.data; 
                }
                return null
            });
    



    return {
        orders,
        csrfToken
    }
}

CancelledOrders.layout = "dashboardLayout"
export default CancelledOrders