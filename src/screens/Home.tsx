import { useReactiveVar } from "@apollo/client";
import { Link } from "react-router-dom";
import { isLoggedInVar, LogUserOut } from "../apollo";
import Nav from "./Nav";

function Home() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col gap-2">
      {isLoggedIn ? <Nav /> : ""}
      <div className="box-default h-24">
        <div className="font-head text-4xl">Coffeegram</div>
      </div>
      <div className="box-default text-xs h-24 flex-col">
        <div>아직 콘텐츠가 없습니다.</div>
        <div> 작업 중에 있습니다...</div>
      </div>
      <div className="box-default h-12 text-xs">
        {isLoggedIn ? (
          <div
            className="text-blue-400 cursor-pointer"
            onClick={() => LogUserOut()}
          >
            로그아웃하기
          </div>
        ) : (
          <Link to="/login" className="text-blue-400">
            로그인
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;
