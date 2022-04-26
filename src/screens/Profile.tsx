import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Avatar from "../Components/Avatar";

const SEE_PROFILE_QR = gql`
  query seeProfile($id: Int!) {
    seeProfile(id: $id) {
      ok
      error
      user {
        id
        username
        name
        email
        location
        avatarURL
        githubUsername
      }
    }
  }
`;

function Profile() {
  const { userid } = useParams();
  // 처음 userid 는 undefined 이다. undefined 인 채로 useQuery 를 하니 에러가 났다. 아닐 때 쿼리를 전송해야 한다. 그렇게 했다.
  const parseId = userid && +userid;
  const { data, loading } = useQuery(SEE_PROFILE_QR, {
    variables: { id: parseId },
  });
  return (
    <div className="h-[calc(100vh-100px)] w-screen flex justify-center items-center flex-col">
      {!loading && data?.seeProfile?.ok ? (
        <div className="box-default h-96 w-80 flex-col p-4">
          <section className="flex w-full margin h-1/4 rounded">
            <div className="flex w-2/6 h-full p-2">
              <Avatar
                url={data?.seeProfile?.user?.avatarURL}
                userId={data?.seeProfile?.user?.id}
              />
            </div>
            <section className="flex justify-center flex-col w-4/6 pl-6 gap-1">
              <div className="font-bold">아이디</div>
              <div className="">{data?.seeProfile?.user?.username}</div>
            </section>
          </section>
          <section className="flex flex-col w-full margin rounded h-1/4 p-2">
            <section className="flex w-full h-1/2 gap-2 p-3">
              <div className="font-bold">성명</div>
              <div>{data?.seeProfile?.user?.name}</div>
            </section>
            <section className="flex w-full h-1/2 gap-2 p-3">
              <div className="font-bold">이메일</div>
              <div>{data?.seeProfile?.user?.email}</div>
            </section>
          </section>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Profile;
