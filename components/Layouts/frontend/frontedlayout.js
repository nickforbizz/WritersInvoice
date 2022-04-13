import React from 'react'
import Footer from './Footer'
import Header from './Header'

export default function frontedlayout({ children }) {
  return (
    <div>
        <Header />

        { children }
        
        <Footer />
    </div>
  )
}
