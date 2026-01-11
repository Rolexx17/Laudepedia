import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Outlet />
      {/* <BottomNav /> */}
    </>
  );
};

export default MainLayout;
