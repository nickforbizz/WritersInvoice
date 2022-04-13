import React from 'react'

const Orders = () => {
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


Orders.layout = "dashboardLayout"
export default Orders