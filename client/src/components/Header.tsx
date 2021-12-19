import React from 'react'

const Header: React.FC = () => {
  return (
    <header>
      <nav className="flex items-center justify-between flex-wrap bg-darkBlue p-6">
        <div className="flex items-center flex-no-shrink text-white mr-6">
          <img src="http://www.ipharmd.net/images/white_medical_cross.png" className="h-8 w-8 mr-2" width="54" height="54"/>
          <span className="title font-bold text-xl tracking-tight">APPT</span>
        </div>
        <div>
          <a href="https://symptoms.webmd.com" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-steelBlue mt-4 lg:mt-0">Symptom Search</a>
          <a href="#" className="inline-block text-sm px-4 py-2 ml-5 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-steelBlue mt-4 lg:mt-0 ">Logout</a>
        </div>
      </nav>
    </header>
  )
}

export default Header;