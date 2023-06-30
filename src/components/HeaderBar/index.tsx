import {Link} from "react-router-dom";
import {BarDiv} from "@components/HeaderBar/styles.tsx";

const HeaderBar = () => {
    return (
        <>
            <BarDiv>
                <Link to = "/main" style={{ textDecoration: "none" }}>코코노트</Link>
                <Link to="/mypage" style={{ textDecoration: "none" }}>내 정보</Link>
            </BarDiv>
        </>
    );
};

export default HeaderBar;
