import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import "@layouts/App.css";
import loadable from "@loadable/component";
const Main = loadable(() => import("@layouts/Main"));
const MyPage = loadable(() => import("@pages/MyPage"));

function App() {
  return (
          <BrowserRouter>
              <Routes>
                  <Route path = "/" element={<Navigate replace to = "/main" />}/>
                  <Route path = "/main" element={<Main />}/>
                  <Route path = "/mypage" element={<MyPage />}/>
              </Routes>
          </BrowserRouter>
  );
}

export default App;
