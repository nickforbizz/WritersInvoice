// import React from 'react'
import  Axios  from 'axios'
import React from 'react'
import { useForm } from "react-hook-form";
import { getCsrfToken } from "next-auth/react"
import MUIDataTable from "mui-datatables";
import { Switch } from '@mui/material';
import { useRouter } from 'next/router';
import toastr from 'toastr';
import SelectField from '../../components/HtmlFields/select';
import moment from 'moment';



const Orders = ({accounts, orders, users, csrfToken}) => {
    
    const router = useRouter(); 
    const { register, setValue, handleSubmit, watch, reset, formState: { errors } } = useForm();

    const openModal = () => {
        setValue("record_id",-1);
        reset();
        $("#addRowModal").modal()
    }


    // Submit Data
    const onSubmit = async data => {
        console.log(data.record_id);
        let url = process.env.BACKEND_URL+'/order';
        let target_url = url;
        let method = 'post';
        if(data.record_id == -1) {
            target_url = url;
            method = 'post';
        }else{
            target_url = `${url}/${data.record_id}`;
            method = 'put';
        }


        try {
            await Axios({
                url: target_url,
                method, 
                data,
            })
            // Axios.post(target_url, data)
            .then(function (response) {
                reset();
                let res = response.data;
                if (res && (response.status == 201 || response.status == 200)) {
                    toastr.success(res.msg, 'Account Registration');
                    toastr.success("redirecting to login page", 'Account Registration');
                    $("#addRowModal").modal('hide')
                    setTimeout(() => {
                    router.reload()
                    }, 2000);
                } else {
                    toastr.error(res.msg, 'Account Registration')
                }
            })
            .catch(function (error) {
                toastr.success("something went wrong", 'Account Registration');        
                console.log(error);
            });
            
        } catch (error) {
            console.error(error);
        }
    }

    // Edit form data
    const editOrder = async (id) => {
        let fetch_order_url = process.env.BACKEND_URL+'/order/'+id
        const edit_order = await Axios.get(fetch_order_url);
        toastr.success(edit_order.data.msg, 'Account Registration|Ammendment');

        // check if there is data to edit
       if(edit_order.data && edit_order.data.data){
           let edit_data = edit_order.data.data;
           setValue("record_id", edit_data.id);
           setValue("account_id", edit_data.account_id);
           setValue("writer_id", edit_data.writer_id);
           setValue("pages", edit_data.pages);
           setValue("cpp", edit_data.cpp);
           setValue("status", edit_data.status);
           setValue("deadline_date", moment(edit_data.deadline_date).local().format('YYYY-MM-DDThh:mm'));
           setValue("payment_date", moment(edit_data.payment_date).local().format('YYYY-MM-DDThh:mm'));

           (edit_data.paid) ? setValue("paid", 1) : setValue("paid", 0); 
       }
        $("#addRowModal").modal()
    }


    // Delete the Record
    const delOrder = async (id) => {
        let confirm = window.confirm("You are about to permanently delete this record. Are you sure you want to proceed?");
        if(confirm){
            let fetch_order_url = process.env.BACKEND_URL+'/order/'+id
            await Axios.delete(fetch_order_url)
                       .then((res) => {  
                           toastr.success(res.data.msg); 
                           setTimeout(() => {
                                router.reload()
                            }, 2000);
                           console.log(res);  
                        })
                       .catch((err) => { console.error(err); })
        }
    }




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
        {name: 'cpp', label: 'cpp'},
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
        {name: 'deadline_date', label: 'deadline_date'},
        {name: 'payment_date', label: 'payment_date'},
        {
            name: "paid",
            label: 'Paid',
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <div>
                        <Switch checked={value}/>
                    </div>;
                }
            },
        },
        {
            name: "Action",
            options: {
              filter: true,
              sort: false,
              empty: true,
              customBodyRender: (dataIndex, rowData) => {
                return (
                    <>
                        <i className="fa fa-edit text-primary mr-4" 
                            onClick={() => editOrder(rowData.rowData[1])}>
                        </i>
                        <i className="fa fa-trash text-danger" 
                            onClick={() => delOrder(rowData.rowData[1])}>
                        </i>
                    </>
                );
              }
            }
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
                            <h2 className="text-white pb-2 fw-bold">Dashboard / Orders</h2>
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
                                        <h4 className="card-title">Add Record</h4>
                                        <button className="btn btn-primary btn-round ml-auto" onClick={openModal}>
                                            <i className="fa fa-plus mr-2"></i>
                                            Add Record
                                        </button>
                                    </div>
                                </div>

                                <div className="card-body">

                                    {
                                        <MUIDataTable
                                            title={"Orders List"}
                                            data={orders_data}
                                            columns={orders_columns}
                                            options={options}
                                        />
                                    }



                                     {/* <!-- Modal --> */}
                                     <div className="modal fade" id="addRowModal" tabIndex="-1" role="dialog" aria-hidden="true">
                                        <div className="modal-dialog modal-lg" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header ">
                                                    <h5 className="modal-title">
                                                        Add | Edit Record
                                                    </h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                   
                                                   
                                                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                                                        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                                                        <input type="hidden" {...register("record_id")} defaultValue={-1}/>
                                                        <div className="row">

                                                            <div className="col-md-6">
                                                                <div className="form-group form-group">
                                                                    <label>Account</label>
                                                                    <select className="form-control" 
                                                                            id="account_id"
                                                                            {...register("account_id", { required: true })}> 
                                                                        <option selected disabled>--select--</option>
                                                                        {
                                                                            accounts.map((item, i) => (
                                                                                 <option value={item.id} key={i}>{item.name}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                    {errors.account_id && <span className='red'>This field is required</span>}
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6">
                                                                <div className="form-group form-group">
                                                                    <label>Writer</label>
                                                                    <select className="form-control" 
                                                                            id="writer_id"
                                                                            {...register("writer_id", { required: true })}> 
                                                                        <option selected disabled>--select--</option>
                                                                        {
                                                                            users.map((item, i) => (
                                                                                 <option value={item.id} key={i}>{item.email}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                    {errors.writer_id && <span className='red'>This field is required</span>}
                                                                </div>
                                                            </div>

                                                            <div className="col-sm-6">
                                                                <div className="form-group form-group">
                                                                    <label>Pages</label>
                                                                    <input id="addName" type="number" className="form-control" 
                                                                        placeholder="fill pages" 
                                                                        {...register("pages", { required: true })} />
                                                                        {errors.pages && <span className='red'>This field is required</span>}
                                                                </div>
                                                            </div>


                                                            <div className="col-md-6 pr-0">
                                                                <div className="form-group form-group">
                                                                    <label>CPP</label>
                                                                    <input id="addCPP" type="number" className="form-control" 
                                                                        placeholder="fill cpp" 
                                                                        {...register("cpp", { required: true })} />
                                                                    {errors.cpp && <span className='red'>This field is required</span>}
                                                                </div>
                                                            </div>


                                                            <div className="col-md-6">
                                                                <div className="form-group form-group">
                                                                    <label>Status</label>
                                                                    <select className="form-control" 
                                                                            id="order_status"
                                                                            {...register("status", { required: true })}> 
                                                                        <option selected disabled>--select--</option>
                                                                        <option value="1">On-progress</option>
                                                                        <option value="2">Revision</option>
                                                                        <option value="3">On-hold</option>
                                                                        <option value="4">Escalated</option>
                                                                        <option value="5">Cancelled</option>
                                                                        <option value="6">Complete</option>
                                                                    </select>
                                                                    {errors.status && <span className='red'>This field is required</span>}
                                                                </div>
                                                            </div>


                                                            <div className="col-md-6 pr-0">
                                                                <div className="form-group form-group">
                                                                    <label>Deadline Date</label>
                                                                    <input id="deadline_date" type="datetime-local" className="form-control" 
                                                                        placeholder="fill Date" 
                                                                        {...register("deadline_date", { required: true })} />
                                                                    {errors.deadline_date && <span className='red'>This field is required</span>}
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 pr-0">
                                                                <div className="form-group form-group">
                                                                    <label>Payment Date</label>
                                                                    <input id="payment_date" type="datetime-local" className="form-control" 
                                                                        placeholder="fill Date" 
                                                                        {...register("payment_date", { required: true })} />
                                                                    {errors.payment_date && <span className='red'>This field is required</span>}
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 pr-0">
                                                                <div className="form-group form-group">
                                                                    <label>Paid</label>
                                                                    <select className="form-control"  
                                                                            id="paid"
                                                                            {...register("paid", { required: true })}> 
                                                                        <option selected disabled>--select--</option>
                                                                        <option value="1">Yes</option>
                                                                        <option value="0">No</option>
                                                                    </select>
                                                                    {errors.paid && <span className='red'>This field is required</span>}
                                                                </div>
                                                            </div>

                                                           
                                                            <div className="col-md-12">
                                                                <hr />
                                                                <button type="button" className="btn btn-danger pull-right " data-dismiss="modal">Close</button>
                                                                <button type="submit" id="addRowButton" className="btn btn-primary pull-right mr-4">Add</button>
                                                            </div>

                                                        </div>
                                                    </form>
                                                </div>
                                                <div className="modal-footer no-bd">
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>

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


Orders.getInitialProps = async (context) => {
    const csrfToken = await getCsrfToken(context);
    const fetch_accs_url = process.env.BACKEND_URL+'/account';
    const fetch_orders_url = process.env.BACKEND_URL+'/order';
    const fetch_users_url = process.env.BACKEND_URL+'/user';

    const accounts = await Axios.get(fetch_accs_url)
            .then(function (response) {
                if(response && response.data && response.data.data){
                    return response.data.data; 
                }
                return null
            });

    const users = await Axios.get(fetch_users_url)
            .then(function (response) {
                if(response && response.data && response.data.data){
                    return response.data.data; 
                }
                return null
            });

    const orders = await Axios.get(fetch_orders_url)
            .then(function (response) {
                if(response && response.data && response.data.data){
                    return response.data.data; 
                }
                return null
            });
    



    return {
        accounts, orders, users,
        csrfToken
    }
}

Orders.layout = "dashboardLayout"
export default Orders