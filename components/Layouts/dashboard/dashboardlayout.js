import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'

export default function dashboardlayout({ children }) {
  return (
    <div className="wrapper">
        <Header />

        <Sidebar />

        <main className="main-panel" style={{paddingTop: '40px'}}>
          { children }

          <Footer />
        </main>
        
    </div>
  )
}
