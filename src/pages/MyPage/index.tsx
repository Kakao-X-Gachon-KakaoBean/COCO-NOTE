import HeaderBar from "@components/HeaderBar";
import {Wrapper} from "@pages/MyPage/styles.tsx";
const MyPage = () => {
    return (
        <>
            <HeaderBar />
            <Wrapper>
                <h1>This is my page</h1>
            </Wrapper>
        </>
    );
};

export default MyPage;
