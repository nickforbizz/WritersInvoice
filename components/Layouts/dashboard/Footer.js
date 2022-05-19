/* eslint-disable @next/next/no-sync-scripts */
import React from 'react'

export default function Footer() {
  return (
    <>
            <footer className="footer">
				<div className="container-fluid">
					<nav className="pull-left">
						<ul className="nav">
							<li className="nav-item">
								<a className="nav-link" href="https://www.mkenyadaima.com">
									Mkenyadaima
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">
									Help
								</a>
							</li>
						</ul>
					</nav>
					<div className="copyright ml-auto">
						2022, made with <i className="fa fa-heart heart text-danger"></i> by <a href="https://www.mkenyadaima.com">Mkenyadaima</a>
					</div>				
				</div>
			</footer>



            {/* <!--   Core JS Files   --> */}
	<script src="/dashboard/assets/js/core/jquery.3.2.1.min.js"></script>
	<script src="/dashboard/assets/js/core/popper.min.js"></script>
	<script src="/dashboard/assets/js/core/bootstrap.min.js"></script>

	{/* <!-- jQuery UI --> */}
	<script src="/dashboard/assets/js/plugin/jquery-ui-1.12.1.custom/jquery-ui.min.js"></script>
	<script src="/dashboard/assets/js/plugin/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js"></script>

	{/* <!-- jQuery Scrollbar --> */}
	<script src="/dashboard/assets/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js"></script>


	{/* <!-- Chart JS --> */}
	<script src="/dashboard/assets/js/plugin/chart.js/chart.min.js"></script>

	{/* <!-- jQuery Sparkline --> */}
	<script src="/dashboard/assets/js/plugin/jquery.sparkline/jquery.sparkline.min.js"></script>

	{/* <!-- Chart Circle --> */}
	<script src="/dashboard/assets/js/plugin/chart-circle/circles.min.js"></script>

	{/* <!-- Datatables --> */}
	<script src="/dashboard/assets/js/plugin/datatables/datatables.min.js"></script>

	{/* <!-- Bootstrap Notify --> */}
	<script src="/dashboard/assets/js/plugin/bootstrap-notify/bootstrap-notify.min.js"></script>

	{/* <!-- jQuery Vector Maps --> */}
	<script src="/dashboard/assets/js/plugin/jqvmap/jquery.vmap.min.js"></script>
	<script src="/dashboard/assets/js/plugin/jqvmap/maps/jquery.vmap.world.js"></script>

	{/* <!-- Sweet Alert --> */}
	<script src="/dashboard/assets/js/plugin/sweetalert/sweetalert.min.js"></script>

	{/* <!-- Atlantis JS --> */}
	<script src="/dashboard/assets/js/atlantis.min.js"></script>
	<script src="/dashboard/assets/js/main.js"></script>

	{/* custom */}
	<script src="/dashboard/assets/js/custom.js"></script>

	
    </>
  )
}
