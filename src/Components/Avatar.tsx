import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

type IAvatar = {
  url: string | undefined;
  userId: number;
};

function Avatar({ url, userId }: IAvatar) {
  const navigate = useNavigate();
  return (
    <>
      {url ? (
        <img
          src={url}
          alt="아바타"
          onClick={() => navigate(`/profile/${userId}`)}
          className="cursor-pointer"
        />
      ) : (
        <FontAwesomeIcon
          className="cursor-pointer w-full h-full"
          icon={faCircleUser}
          onClick={() => navigate(`/profile/${userId}`)}
        />
      )}
    </>
  );
}

export default Avatar;
