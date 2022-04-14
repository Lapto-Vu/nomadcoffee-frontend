import { useReactiveVar } from "@apollo/client";
import {
  faCircleUser,
  faPersonWalkingDashedLineArrowRight,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { isLoggedInVar, LogUserOut } from "../apollo";

function Nav() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 w-screen bg-white h-12 shadow-sm flex justify-between items-center px-4 text-xl dark:bg-slate-800">
      <div
        className="font-head mb-1 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Coffeegram
      </div>
      <div className="flex gap-3">
        {isLoggedIn ? (
          <FontAwesomeIcon
            className="cursor-pointer"
            icon={faSquarePlus}
            onClick={() => navigate("/add")}
          />
        ) : (
          ""
        )}
        <FontAwesomeIcon
          className="cursor-pointer"
          icon={isLoggedIn ? faPersonWalkingDashedLineArrowRight : faCircleUser}
          onClick={() => (isLoggedIn ? LogUserOut() : navigate("/login"))}
        />
      </div>
    </div>
  );
}

export default Nav;
