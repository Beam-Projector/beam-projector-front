import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import Ranking from "./pages/Ranking";
import Main from "./components/Main/Main";
import About from "./pages/About";
import Board from "./pages/Board";
import CreatePost from "./pages/CreatePost";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import Members from "./pages/Members";
import Post from "./pages/Post";

import MemberUpdateForm from "./components/common/MemberUpdateForm";

function App() {
  const router = [
    { path: "/", element: <Home /> },
    {
      path: "/login",
      element: <LoginForm />,
    },
    {
      path: "/signup",
      element: <SignupForm />,
    },
    {
      path: "/members",
      element: <Members />,
    },
    {
      path: "/memberupdate",
      element: <MemberUpdateForm />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/board",
      element: <Board />,
    },
    {
      path: "/board/:id",
      element: <Post />,
    },
    {
      path: "/board/create",
      element: <CreatePost />,
    },
    {
      path: "/ranking",
      element: <Ranking />,
    },
  ];
  //로그인이 되었을때만 UI를 보고 접근가능하게 하기
  return (
    <>
      <Main>
        <Header />
        <Routes>
          {router.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Main>
    </>
  );
}

export default App;
