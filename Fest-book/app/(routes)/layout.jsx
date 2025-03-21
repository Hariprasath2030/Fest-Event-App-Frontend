import React from 'react'
import Dashboard from './page'
import Dash from './pages/dashboard'
function DashboardLayout({childern}) {
  return (
    <div>
        <div className='relative md:ml-64'>
            <Dashboard
            />
        </div>
        <div className='md:ml-64'>
            <Dash/>
            {childern}
        </div>
    </div>
  )
}

export default DashboardLayout