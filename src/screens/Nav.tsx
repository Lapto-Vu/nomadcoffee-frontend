import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="fixed top-0 w-screen bg-white h-12 shadow-sm flex justify-between items-center px-4 text-xl">
      <div className="font-head mb-1">Coffeegram</div>
      <div>
        <Link to="/add">
          <FontAwesomeIcon className="cursor-pointer" icon={faSquarePlus} />
        </Link>
      </div>
    </div>
  );
}

export default Nav;
