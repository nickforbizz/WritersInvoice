/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react"

const Sidebar = () => {
	const router = useRouter();
	const { data: token} = useSession();
	const [user, setUser] = useState({});
	
	
	useEffect(() => {
		console.log({token})
		let user = token?.user;
		setUser(user)	
	})
	
  return (
    <>
    

        <div className="sidebar sidebar-style-2">			
			<div className="sidebar-wrapper scrollbar scrollbar-inner">
				<div className="sidebar-content">

					<div className="user">
						<div className="avatar-sm float-left mr-2">
							<img src={user?.image} alt={user?.name} 
										className="avatar-img rounded-circle"
										width='45px' height='45px' />
						</div>

						<div className="info">
							<a data-toggle="collapse" href="#collapseExample" aria-expanded="true" >
								<span>
									{user?.name} 
									<span className="user-level">Administrator</span>
									<span className="caret"></span>
								</span>
							</a>
							<div className="clearfix"></div>

							<div className="collapse in" id="collapseExample">
								<ul className="nav">
									<li>
										<a href="#profile">
											<span className="link-collapse">My Profile</span>
										</a>
									</li>
									<li>
										<a href="#edit">
											<span className="link-collapse">Edit Profile</span>
										</a>
									</li>
									<li>
										<a href="#settings">
											<span className="link-collapse">Settings</span>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<ul className="nav nav-primary">
						<li className={"nav-item " + (router.pathname == "/Dashboard" ? "active" : "")}>
							<Link href="/Dashboard">
								<a>
									<i className="fa fa-tachometer"></i>
									<span className="sub-item">Dashboard </span>

								</a>
							</Link>
						</li>

						<li className={"nav-item " + (router.pathname == "/Dashboard/accounts" ? "active" : "")}>
							<Link href="/Dashboard/accounts">
								<a>
									<i className="fa fa-exchange"></i>
									<span className="sub-item">Accounts </span>
								</a>
							</Link>
						</li>

						<li className={"nav-item " + (router.pathname == "/Dashboard/orders" ? "active" : "")}>
							<Link href="/Dashboard/orders">
								<a>
									<i className="fa fa-rss"></i>
									<span className="sub-item">Orders </span>
								</a>
							</Link>
						</li>

						<li className="nav-item">
							<a data-toggle="collapse" href="#tables">
								<i className="fa fa-table"></i>
								<p>tables</p>
								<span className="caret"></span>
							</a>
							<div className="collapse" id="tables">
								<ul className="nav nav-collapse">
									<li>
										<a href="tables/tables.html">
											<span className="sub-item">Basic Table</span>
										</a>
									</li>
									<li>
										<a href="tables/datatables.html">
											<span className="sub-item">Datatables</span>
										</a>
									</li>
								</ul>
							</div>
						</li>

						<li className="nav-item">
							<a data-toggle="collapse" href="#submenu">
								<i className="fa fa-bars"></i>
								<p>Menu Levels</p>
								<span className="caret"></span>
							</a>
							<div className="collapse" id="submenu">
								<ul className="nav nav-collapse">
									<li>
										<a data-toggle="collapse" href="#subnav1">
											<span className="sub-item">Level 1</span>
											<span className="caret"></span>
										</a>
										<div className="collapse" id="subnav1">
											<ul className="nav nav-collapse subnav">
												<li>
													<a href="#">
														<span className="sub-item">Level 2</span>
													</a>
												</li>
												<li>
													<a href="#">
														<span className="sub-item">Level 2</span>
													</a>
												</li>
											</ul>
										</div>
									</li>
									<li>
										<a data-toggle="collapse" href="#subnav2">
											<span className="sub-item">Level 1</span>
											<span className="caret"></span>
										</a>
										<div className="collapse" id="subnav2">
											<ul className="nav nav-collapse subnav">
												<li>
													<a href="#">
														<span className="sub-item">Level 2</span>
													</a>
												</li>
											</ul>
										</div>
									</li>
									<li>
										<a href="#">
											<span className="sub-item">Level 1</span>
										</a>
									</li>
								</ul>
							</div>
						</li>

						<li className="nav-item  mt-5">
							<a onClick={() => signOut()}>
								<i className="fa fa-sign-out"></i>
								<span className="sub-item">Sign Out </span>
							</a>
						</li>
					</ul>

					
				</div>
			</div>
		</div>

    </>
  )
}


export async function getServerSideProps(context) {
	const session = await getSession(context);
	if (!session) {
	  context.res.writeHead(302, { Location: "/" });
	  context.res.end();
	  return {};
	}
	console.log("hey ...");
	return {
	  props: {
		user: session.user,
	  },
	};
  }

export default Sidebar;