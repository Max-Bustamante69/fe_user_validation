import React, { useState, useEffect } from 'react';
import Layout from '@pages/Desktop/Layout';
import LayoutMobile from '@pages/Mobile/LayoutMobile';
import { isMobile } from '@/lib/utils/isMobile';

const ResponsiveLayout = ({ children }) => {
  const [mobile, setMobile] = useState(isMobile());

  useEffect(() => {
    const handleResize = () => {
      setMobile(isMobile());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return mobile ? <LayoutMobile>{children}</LayoutMobile> : <Layout>{children}</Layout>;
};

export default ResponsiveLayout;
