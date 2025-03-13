import React from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router';
import logo from '@assets/pagui-logo.png';

const LayoutMobile = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center  bg-white overflow-hidden relative p-8">
     
        <Link className='flex w-full justify-start' to="/" aria-label="Go to Home Page">
          <img className="w-16" src={logo} alt="Pagui Logo" />
        </Link>
   
      <div className="flex flex-col items-center justify-around w-full p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutMobile;
