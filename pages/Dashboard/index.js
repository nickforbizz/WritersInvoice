import React from 'react'
import { signOut, getSession } from "next-auth/react"
const { User } = require('../../models');

 const Dashboard = ({get_session}) => {
	
	// console.log(get_session.user)
  return (
	<>

		
			<div className="content">
				<div className="panel-header bg-primary-gradient">
					<div className="page-inner py-5">
						<div className="d-flex align-items-left align-items-md-center flex-column flex-md-row">
							<div>
								<h2 className="text-white pb-2 fw-bold">Dashboard</h2>
								<h5 className="text-white op-7 mb-2">Monitor and manage you invoices</h5>
							</div>
						</div>
					</div>
				</div>


				<div className="page-inner mt--5">
					<div className="row mt--2">
						<div className="col-md-6">
							<div className="card full-height">
								<div className="card-body">
									<div className="card-title">Overall statistics</div>
									<div className="card-category">Daily information about statistics in system</div>
									<div className="d-flex flex-wrap justify-content-around pb-2 pt-4">
										<div className="px-2 pb-2 pb-md-0 text-center">
											<div id="circles-1"></div>
											<h6 className="fw-bold mt-3 mb-0">New Users</h6>
										</div>
										<div className="px-2 pb-2 pb-md-0 text-center">
											<div id="circles-2"></div>
											<h6 className="fw-bold mt-3 mb-0">Orders</h6>
										</div>
										<div className="px-2 pb-2 pb-md-0 text-center">
											<div id="circles-3"></div>
											<h6 className="fw-bold mt-3 mb-0">Rejected Orders</h6>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="card full-height">
								<div className="card-body">
									<div className="card-title">Total Orders taken & Income statistics</div>
									<div className="row py-3">
										<div className="col-md-4 d-flex flex-column justify-content-around">
											<div>
												<h6 className="fw-bold text-uppercase text-success op-8">Total Income</h6>
												<h3 className="fw-bold">$9.782</h3>
											</div>
											<div>
												<h6 className="fw-bold text-uppercase text-danger op-8">Total Orders</h6>
												<h3 className="fw-bold">248</h3>
											</div>
										</div>
										<div className="col-md-8">
											<div id="chart-container">
												<canvas id="totalIncomeChart"></canvas>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-8">
							<div className="card">
								<div className="card-header">
									<div className="card-head-row">
										<div className="card-title">Orders Statistics</div>
									</div>
								</div>
								<div className="card-body">
									<div className="chart-container" style={{minHeight: 375+"px"}}>
										<canvas id="statisticsChart"></canvas>
									</div>
									<div id="myChartLegend"></div>
								</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className="card card-primary">
								<div className="card-header">
									<div className="card-title">Daily Orders</div>
									<div className="card-category">March 25 - April 02</div>
								</div>
								<div className="card-body pb-0">
									<div className="mb-4 mt-2">
										<h1>$4,578.58</h1>
									</div>
									<div className="pull-in">
										<canvas id="dailySalesChart"></canvas>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-4">
							<div className="card">
								<div className="card-body">
									<div className="card-title fw-mediumbold">Colleague&apos;s Profiles</div>
									<div className="card-list">
										<div className="item-list">
											<div className="avatar">
												<img src="/dashboard/assets/img/jm_denis.jpg" alt="..." className="avatar-img rounded-circle" />
											</div>
											<div className="info-user ml-3">
												<div className="username">Jimmy Denis</div>
												<div className="status">Graphic Designer</div>
											</div>
											<button className="btn btn-icon btn-primary btn-round btn-xs">
												<i className="fa fa-plus"></i>
											</button>
										</div>
										<div className="item-list">
											<div className="avatar">
												<img src="/dashboard/assets/img/chadengle.jpg" alt="..." className="avatar-img rounded-circle" />
											</div>
											<div className="info-user ml-3">
												<div className="username">Chad</div>
												<div className="status">CEO Zeleaf</div>
											</div>
											<button className="btn btn-icon btn-primary btn-round btn-xs">
												<i className="fa fa-plus"></i>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="card full-height">
								<div className="card-header">
									<div className="card-title">Feed Activity</div>
								</div>
								<div className="card-body">
									<ol className="activity-feed">
										<li className="feed-item feed-item-secondary">
											<time className="date" dateTime="9-25">Sep 25</time>
											<span className="text">Responded to need <a href="#">&apos;Volunteer opportunity&apos;</a></span>
										</li>
										<li className="feed-item feed-item-success">
											<time className="date" dateTime="9-24">Sep 24</time>
											<span className="text">Added an interest <a href="#">&apos;Volunteer Activities&apos;</a></span>
										</li>
										
									</ol>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* .page-inner */}


			</div>



	</>
  )
}


export async function getServerSideProps(context) {
	const get_session = await getSession(context);
	
	
	if (!get_session) {
		signOut();
		return {
			redirect: {
			  destination: '/',
			  permanent: false,
			},
		  }
	}

	let email =  get_session.user.email;
	let db_user = await User.findOne({ where: { email }});
	if (db_user && db_user.active === 0) {
		let new_destination = (db_user && db_user.active === 0) ? '/notauthorized' : '/dashboard';
		signOut();
		return {
			redirect: {
			  destination: new_destination,
			  permanent: false,
			},
		  }
	}
  
	return {
	  props: { get_session }
	}
  }

Dashboard.layout = "dashboardLayout"
export default Dashboard
