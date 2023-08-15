import HeaderBar from '@/components/HeaderBar';
import SideBar from '@/components/SideBar';
import Issue from '@/components/Issue';
import SideDetailBar from '@/components/SideDetailBar';

const IssuePage = () => {
  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      <Issue />
    </>
  );
};

export default IssuePage;
