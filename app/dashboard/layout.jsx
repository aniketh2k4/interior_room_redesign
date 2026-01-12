export const dynamic = "force-dynamic";
import React from 'react'
import Header from './_components/Header'

function DashboardLayout({children}) {
  return (
    <div>
        <Header/>
        <div className='pt-20 px-10 md:px-20 lg:px-20 xl:px-60'>
            {children}
        </div>
        
    </div>
  )
}

export default DashboardLayout