import { MainSection, Wrapper } from "./styles.tsx";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const FirstPage = () => {
  return (
    <>
      <Wrapper>
        <MainSection>
          <div>CoCoNote</div>
          <div>로그인하여 시작</div>
          <Link to="/login">
            <Button variant="contained">Login</Button>
          </Link>
        </MainSection>
      </Wrapper>
    </>
  );
};

export default FirstPage;
