/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-css-tags */
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useSession, signOut  } from "next-auth/react"
import Document from '../../../pages/_document';



export default function Header(){
	const { data: token} = useSession();
	const [user, setUser] = useState({});
	
	
	useEffect(() => {
		let user = token?.user;
		setUser(user)	
	})


  return (
    <>
        


        <div className="main-header">
			{/* <!-- Logo Header --> */}
			<div className="logo-header" data-background-color="blue">
				
				<a href="index.html" className="logo text-white">
					WritersInvoice
				</a>
				<button className="navbar-toggler sidenav-toggler ml-auto" type="button" data-toggle="collapse" data-target="collapse" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon">
						<i className="fa fa-bars"></i>
					</span>
				</button>
				<button className="topbar-toggler more"><i className="fa fa-caret-down"></i></button>
				<div className="nav-toggle">
					<button className="btn btn-toggle toggle-sidebar">
						<i className="fa fa-bars"></i>
					</button>
				</div>
			</div>
			{/* <!-- End Logo Header --> */}

			{/* <!-- Navbar Header --> */}
			<nav className="navbar navbar-header navbar-expand-lg" data-background-color="blue2">
				
				<div className="container-fluid">
					
					<ul className="navbar-nav topbar-nav ml-md-auto align-items-center">
						<li className="nav-item dropdown hidden-caret">
							<a className="nav-link dropdown-toggle" href="#" id="notifDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<i className="fa fa-bell"></i>
								<span className="notification">1</span>
							</a>
							<ul className="dropdown-menu notif-box animated fadeIn" aria-labelledby="notifDropdown">
								<li>
									<div className="dropdown-title">You have 1 new notification</div>
								</li>
								<li>
									<div className="notif-scroll scrollbar-outer">
										<div className="notif-center">
											<a href="#">
												<div className="notif-icon notif-primary"> <i className="fa fa-user-plus"></i> </div>
												<div className="notif-content">
													<span className="block">
														New user registered
													</span>
													<span className="time">5 minutes ago</span> 
												</div>
											</a>
										</div>
									</div>
								</li>
								<li>
									<a className="see-all" href="#">See all notifications<i className="fa fa-angle-right"></i> </a>
								</li>
							</ul>
						</li>
						<li className="nav-item dropdown hidden-caret">
							<a className="dropdown-toggle profile-pic" data-toggle="dropdown" href="#" aria-expanded="false">
								<div className="avatar-sm">
									<img src={user?.image} alt={user?.name} 
										className="avatar-img rounded-circle"
										width='45px' height='45px' />
								</div>
							</a>
							<ul className="dropdown-menu dropdown-user animated fadeIn">
								<div className="dropdown-user-scroll scrollbar-outer">
									<li>
										<div className="user-box">
											<div className="avatar-lg">
											<img src={user?.image} alt={user?.name} 
												className="avatar-img rounded-circle"
												width='45px' height='45px' />
											</div>
											<div className="u-text">
												<h4> {user?.name} </h4>
												<p className="text-muted">{user?.name}</p><a href="profile.html" className="btn btn-xs btn-secondary btn-sm">View Profile</a>
											</div>
										</div>
									</li>
									<li>
										<div className="dropdown-divider"></div>
										<a className="dropdown-item" href="#">My Profile</a>
										<Link href="#"> 
											<a className="dropdown-item" onClick={() => signOut()}>Logout</a>
										</Link>
									</li>
								</div>
							</ul>
						</li>
					</ul>
				</div>
			</nav>
			{/* <!-- End Navbar --> */}
		</div>
    </>
  )
}



