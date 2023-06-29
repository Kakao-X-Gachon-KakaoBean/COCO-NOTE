import HeaderBar from "@components/HeaderBar";
import {Wrapper} from "@layouts/Main/styles.tsx";
const Main = () => {
    return (
        <Wrapper>
            <HeaderBar />
            <div>
                <h1>Welcome to the Main Page</h1>
            </div>
        </Wrapper>
    );
};

export default Main;
