import {
  faCircleUser,
  faPersonWalkingDashedLineArrowRight,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { LogUserOut } from "../apollo";
import Avatar from "../Components/Avatar";
import useUser from "../hooks/useUser";

function Nav() {
  const navigate = useNavigate();
  const currentUser = useUser();
  return (
    <div className="fixed top-0 w-screen bg-white h-12 shadow-sm flex justify-between items-center px-4 text-xl dark:bg-slate-800">
      <div
        className="font-head mb-1 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Coffeegram
      </div>
      <div className="flex gap-3">
        {currentUser && currentUser?.username ? (
          <>
            <FontAwesomeIcon
              className="cursor-pointer"
              icon={faSquarePlus}
              onClick={() => navigate("/add")}
            />
            <div className="flex w-5 h-5">
              <Avatar url={currentUser?.avatarURL} userId={currentUser?.id} />
            </div>
            <FontAwesomeIcon
              className="cursor-pointer"
              icon={faPersonWalkingDashedLineArrowRight}
              onClick={() => LogUserOut()}
            />
          </>
        ) : (
          <FontAwesomeIcon
            className="cursor-pointer"
            icon={faCircleUser}
            onClick={() => navigate("/login")}
          />
        )}
      </div>
    </div>
  );
}

export default Nav;
