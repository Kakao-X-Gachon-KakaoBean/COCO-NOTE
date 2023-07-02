import {Link} from "react-router-dom";
import {BarDiv, LogoDiv, OthersDiv} from "@components/HeaderBar/styles.tsx";
import Notification from "@components/HeaderBar/Notification";
import MyInfo from "@components/HeaderBar/MyInfo";

const HeaderBar = () => {
    return (
        <>
            <BarDiv>
                <LogoDiv>
                    <Link to = "/main" style={{ textDecoration: "none", color: "black" }}>코코노트</Link>
                </LogoDiv>
                <OthersDiv>
                    <Notification/>
                    <MyInfo/>
                </OthersDiv>
            </BarDiv>
        </>
    );
};

export default HeaderBar;
