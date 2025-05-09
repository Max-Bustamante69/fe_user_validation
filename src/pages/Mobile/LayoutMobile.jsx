import React from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router';
import logo from '@assets/pagui-logo.png';

const LayoutMobile = () => {
  return (
    <div className="h-dvh w-full flex flex-col items-center justify-start gap-4  bg-white overflow-x-hidden overflow-auto relative pb-4 px-4">
      <Link className='flex w-dvw bg-white pl-4 py-4 shadow justify-start sticky top-2 left-12' to="/" aria-label="Go to Home Page">
        <img className="w-16" src={logo} alt="Pagui Logo" width="64" height="64" />
      </Link>
      <Outlet />
    </div>
  );
};

export default LayoutMobile;
