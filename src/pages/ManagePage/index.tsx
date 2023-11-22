import ManageMember from '@components/ManageMember';
import HeaderBar from '@components/HeaderBar';
import SideBar from '@components/SideBar';
import SideDetailBar from '@components/SideDetailBar';

const ManagePage = () => {
  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      <ManageMember />
    </>
  );
};

export default ManagePage;
