import HeaderBar from "@components/HeaderBar";
import {Wrapper} from "@layouts/Main/styles.tsx";
import SideBar from "@components/SideBar";
const Main = () => {
    return (
        <>
        <SideBar/>
    <HeaderBar />
        <Wrapper>
            <div>
                <h1>Welcome to the Main Page</h1>
            </div>
        </Wrapper>
        </>
    );
};

export default Main;
