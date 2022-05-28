import React from 'react'
import  Axios  from 'axios'
import { useForm } from "react-hook-form";
import { getCsrfToken } from "next-auth/react"
import MUIDataTable from "mui-datatables";
import toastr from 'toastr';


// components
import Link from 'next/link';
import { Switch } from '@mui/material';
import { useRouter } from 'next/router';


const Accounts = ({accounts, csrfToken}) => {
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
        let url = process.env.BACKEND_URL+'/account';
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
            //   console.log(error);
            });
            
        } catch (error) {
          console.error(error);
        }
    }

    // Edit form data
    const editAccount = async (id) => {
        let fetch_account_url = process.env.BACKEND_URL+'/account/'+id
        const edit_accounts = await Axios.get(fetch_account_url);
        toastr.success(edit_accounts.data.msg, 'Account Registration|Ammendment');

        // check if there is data to edit
        console.log(edit_accounts.data)
        console.log(id)
       if(edit_accounts.data && edit_accounts.data.data){
           let edit_data = edit_accounts.data.data;
           setValue("record_id", edit_data.id);
           setValue("name", edit_data.name);
           setValue("cpp", edit_data.cpp);
           setValue("managed_by", edit_data.managed_by);
           setValue("no_of_writers", edit_data.no_of_writers);
           setValue("uses_vpn", edit_data.uses_vpn);
           setValue("vpn_name", edit_data.vpn_name);
           setValue("vpn_cost", edit_data.vpn_cost);
       }
        $("#addRowModal").modal()
    }


    // Delete the Record
    const delAccount = async (id) => {
        let confirm = window.confirm("You are about to permanently delete this record. Are you sure you want to proceed?");
        if(confirm){
            let fetch_account_url = process.env.BACKEND_URL+'/account/'+id
            await Axios.delete(fetch_account_url)
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

    const acc_columns = [
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
        {name: 'name', label: 'Name'},
        {name: 'cpp', label: 'CPP'},
        {name: 'managed_by', label: 'Managed By'},
        {name: 'no_of_writers', label: 'No of Writers'},
        {
            name: "uses_vpn",
            label: 'Uses Vpn',
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
        {name: 'vpn_name', label: 'Vpn Name'},
        {name: 'vpn_cost', label: 'Vpn Cost'},
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
                            onClick={() => editAccount(rowData.rowData[1])}>
                        </i>
                        <i className="fa fa-trash text-danger" 
                            onClick={() => delAccount(rowData.rowData[1])}>
                        </i>
                    </>
                );
              }
            }
          },
    ];
    const acc_data = accounts;
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
                                        <button className="btn btn-primary btn-round ml-auto" onClick={openModal}>
                                            <i className="fa fa-plus mr-2"></i>
                                            Add Record
                                        </button>
                                    </div>
                                </div>

                                <div className="card-body">


                                    {
                                        <MUIDataTable
                                            title={"Accounts List"}
                                            data={acc_data}
                                            columns={acc_columns}
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
                                                            <div className="col-sm-12">
                                                                <div className="form-group form-group">
                                                                    <label>Name</label>
                                                                    <input id="addName" type="text" className="form-control" 
                                                                        placeholder="fill name" 
                                                                        {...register("name", { required: true })} />
                                                                        {errors.name && <span className='red'>This field is required</span>}
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
                                                                    <label>Managed By</label>
                                                                    <input id="addManagedBy" type="number" className="form-control" 
                                                                    placeholder="fill ManagedBy"
                                                                    {...register("managed_by", { required: true })} />
                                                                    {errors.managed_by && <span className='red'>This field is required</span>}
                                                                </div>
                                                            </div>


                                                            <div className="col-md-6 pr-0">
                                                                <div className="form-group form-group">
                                                                    <label>No Of Writers</label>
                                                                    <input id="addNoOfWriters" type="number" className="form-control" 
                                                                        placeholder="fill no_of_writers" 
                                                                        {...register("no_of_writers", { required: true })} />
                                                                    {errors.no_of_writers && <span className='red'>This field is required</span>}
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 pr-0">
                                                                <div className="form-group form-group">
                                                                    <label>Uses Vpn</label>
                                                                    <select className="form-control"  
                                                                            id="adduses_vpn"
                                                                            {...register("uses_vpn", { required: true })}> 
                                                                        <option selected disabled>--select--</option>
                                                                        <option value="1">Yes</option>
                                                                        <option value="2">No</option>
                                                                    </select>
                                                                    {errors.uses_vpn && <span className='red'>This field is required</span>}
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 pr-0">
                                                                <div className="form-group form-group">
                                                                    <label>Vpn Name</label>
                                                                    <input id="addvpn_name" type="text" className="form-control" 
                                                                        placeholder="fill vpn_name" 
                                                                        {...register("vpn_name", { required: true })} />
                                                                    {errors.vpn_name && <span className='red'>This field is required</span>}
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 pr-0">
                                                                <div className="form-group form-group">
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
                if(response && response.data && response.data.data){
                    return response.data.data;
                }
                return null
            })


    return {
        accounts, csrfToken
    }
}

Accounts.layout = "dashboardLayout"
export default Accounts