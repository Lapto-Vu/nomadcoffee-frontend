import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, LogUserOut } from "../apollo";

const CURRENT_USER_QR = gql`
  query currentUser {
    currentUser {
      ok
      error
      user {
        username
        avatarURL
        id
      }
    }
  }
`;

function useUser() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data, loading } = useQuery(CURRENT_USER_QR, { skip: !hasToken });
  useEffect(() => {
    if (!data?.currentUser?.ok && !loading) {
      LogUserOut();
    }
  }, [data]);
  return data?.currentUser?.user;
}

export default useUser;
