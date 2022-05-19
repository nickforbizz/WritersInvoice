import React from 'react'
import  Axios  from 'axios'
import { useForm } from "react-hook-form";
import { getCsrfToken } from "next-auth/react"
import MUIDataTable from "mui-datatables";
import toastr from 'toastr';


// components
import Link from 'next/link';
import { env } from '../../next.config';

const Accounts = ({accounts, csrfToken}) => {
    const BACKEND_URL = env.BACKEND_URL
    
    // Submit Data
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        try {
            Axios.post(`${BACKEND_URL}/account`, data)
            .then(function (response) {
              reset();
              let res = response.data;
              if (res && response.status == 201) {
                  toastr.success(res.msg, 'Account Registration');
                  toastr.success("redirecting to login page", 'Account Registration');
                  setTimeout(() => {
                    //   router.push('/')
                  }, 2000);
              } else {
                  toastr.error(res.msg, 'Account Registration')
              }
            })
            .catch(function (error) {
              toastr.success("something went wrong", 'Account Registration');        
            //   console.log(error);
            });
            
        } catch (error) {
          // logger.error(error.stack) 
          console.error(error);
        }
    }

    console.log(accounts)
    const acc_columns = [
        'id',"name", "cpp", "managed_by", "no_of_writers", "uses_vpn", "vpn_name", "vpn_cost",
        {
            name: "Action",
            options: {
              filter: true,
              sort: false,
              empty: true,
              customBodyRender: (dataIndex, rowData) => {
                return (
                  <button onClick={() => editAccount(rowData.rowData[0])}>
                    Edit
                  </button>
                );
              }
            }
          },
    ];
    const acc_data = accounts;
    const options = {
        // filterType: 'checkbox',
    };

    const editAccount = async (id) => {
        let fetch_account_url = process.env.BACKEND_URL+'/account/'+id
        const edit_accounts = await Axios.get(fetch_account_url);
        console.log(edit_accounts);
        $("#addRowModal").modal()
    }


    return (
        <>
            <div className="content">

                <div className="panel-header bg-primary-gradient">
                    <div className="page-inner py-5">
                        <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row">
                            <div>
                                <h2 className="text-white pb-2 fw-bold">Dashboard / Accounts</h2>
                                <h5 className="text-white op-7 mb-2">Monitor and manage you Accounts</h5>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='page-inner'>
                    <div className='row'>
                    

                        <div className="col-md-12">




                            <div className="card">
                                <div className="card-header">
                                    <div className="d-flex align-items-center">
                                        <h4 className="card-title">Add Record</h4>
                                        <button className="btn btn-primary btn-round ml-auto" data-toggle="modal" data-target="#addRowModal">
                                            <i className="fa fa-plus mr-2"></i>
                                            Add Record
                                        </button>
                                    </div>
                                </div>

                                <div className="card-body">


                                    {/* <!-- Modal --> */}
                                    <div className="modal fade" id="addRowModal" tabIndex="-1" role="dialog" aria-hidden="true">
                                        <div className="modal-dialog modal-lg" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header ">
                                                    <h5 className="modal-title">
                                                        Add New Record
                                                    </h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body p-3">
                                                    <p className="small">Create a new row using this form, make sure you fill them all</p>
                                                   
                                                   
                                                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                                                        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <div className="form-group form-group-default">
                                                                    <label>Name</label>
                                                                    <input id="addName" type="text" className="form-control" 
                                                                        placeholder="fill name" 
                                                                        {...register("name", { required: true })} />
                                                                        {errors.name && <span className='red'>This field is required</span>}
                                                                </div>
                                                            </div>


                                                            <div className="col-md-6 pr-0">
                                                                <div className="form-group form-group-default">
                                                                    <label>CPP</label>
                                                                    <input id="addCPP" type="number" className="form-control" 
                                                                        placeholder="fill cpp" 
                                                                        {...register("cpp", { required: true })} />
                                                                    {errors.cpp && <span className='red'>This field is required</span>}
                                                                </div>
                                                            </div>


                                                            <div className="col-md-6">
                                                                <div className="form-group form-group-default">
                                                                    <label>Managed By</label>
                                                                    <input id="addManagedBy" type="number" className="form-control" 
                                                                    placeholder="fill ManagedBy"
                                                                    {...register("managed_by", { required: true })} />
                                                                    {errors.managed_by && <span className='red'>This field is required</span>}
                                                                </div>
                                                            </div>


                                                            <div className="col-md-6 pr-0">
                                                                <div className="form-group form-group-default">
                                                                    <label>No Of Writers</label>
                                                                    <input id="addNoOfWriters" type="number" className="form-control" 
                                                                        placeholder="fill no_of_writers" 
                                                                        {...register("no_of_writers", { required: true })} />
                                                                    {errors.no_of_writers && <span className='red'>This field is required</span>}
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 pr-0">
                                                                <div className="form-group form-group-default">
                                                                    <label>Uses Vpn</label>
                                                                    <input id="adduses_vpn" type="number" className="form-control" 
                                                                        placeholder="fill uses_vpn" 
                                                                        {...register("uses_vpn", { required: true })} />
                                                                    {errors.uses_vpn && <span className='red'>This field is required</span>}
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 pr-0">
                                                                <div className="form-group form-group-default">
                                                                    <label>Vpn Name</label>
                                                                    <input id="addvpn_name" type="text" className="form-control" 
                                                                        placeholder="fill vpn_name" 
                                                                        {...register("vpn_name", { required: true })} />
                                                                    {errors.vpn_name && <span className='red'>This field is required</span>}
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 pr-0">
                                                                <div className="form-group form-group-default">
                                                                    <label>Vpn Cost</label>
                                                                    <input id="addvpn_cost" type="number" className="form-control" 
                                                                        placeholder="fill vpn_cost" 
                                                                        {...register("vpn_cost", { required: true })} />
                                                                    {errors.vpn_cost && <span className='red'>This field is required</span>}
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


                                    {
                                        <MUIDataTable
                                            title={"Accounts List"}
                                            data={acc_data}
                                            columns={acc_columns}
                                            options={options}
                                        />
                                    }
                                </div>
                            </div>
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


Accounts.getInitialProps = async (context) => {

    
    const csrfToken = await getCsrfToken(context);
    const fetch_accs_url = process.env.BACKEND_URL+'/account';
    const accounts = await Axios.get(fetch_accs_url)
            .then(function (response) {
                // console.log(response);
                if(response && response.data && response.data.data){
                    let res = response.data.data;
                    console.log(res);
                   return res

                }
                return null
            })


    return {
        accounts, csrfToken
    }
}

Accounts.layout = "dashboardLayout"
export default Accounts