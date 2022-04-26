/* eslint-disable jsx-a11y/alt-text */
import { gql, useQuery } from "@apollo/client";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Avatar from "../Components/Avatar";

export const SEE_COFFEESHOPS_QR = gql`
  query seeCoffeeShops {
    seeCoffeeShops {
      ok
      error
      coffeeShop {
        id
        name
        photos {
          id
          url
        }
        categories {
          slug
        }
        user {
          id
          username
          avatarURL
        }
        createdAt
      }
    }
  }
`;

function Home() {
  const { data, loading } = useQuery(SEE_COFFEESHOPS_QR);
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen grid grid-cols-5 grid-rows-3 gap-4 p-4">
      <Helmet>
        <title>Coffeegram</title>
      </Helmet>
      {!loading
        ? data?.seeCoffeeShops?.coffeeShop.map((feed: any) => {
            return (
              <div
                className="bg-white shadow-md rounded p-1 dark:bg-slate-800 dark:ring-gray-900 flex flex-col cursor-pointer"
                onClick={() => navigate(`/shop/${feed.id}`)}
              >
                <section className="h-3/4 w-full flex justify-center items-center">
                  <img
                    className="h-full w-full object-cover rounded-t contrast-75 hover:contrast-100"
                    src={feed?.photos[0].url}
                  />
                </section>
                <section className="h-1/4 w-full flex flex-col justify-between">
                  <article className="h-1/2 flex pt-1 items-center pl-1">
                    {feed.categories.map((i: any) => {
                      return (
                        <span className="text-gray-400 text-[0.6rem]">
                          {i.slug}
                        </span>
                      );
                    })}
                  </article>
                  <article className="h-1/2 w-full flex items-center px-1 justify-between">
                    <span className="text-[0.6rem]">{feed.name}</span>
                    <div className="h-full w-14 flex items-center justify-between">
                      <div className="h-[0.6rem] w-[0.6rem] flex justify-center items-center">
                        <Avatar
                          url={feed.user.avatarURL}
                          userId={feed.user.id}
                        />
                      </div>
                      <FontAwesomeIcon
                        className="h-[0.6rem] w-[0.6rem] flex justify-center items-center"
                        icon={faHeart}
                      />
                      <span className="text-[0.6rem] mb-[1px]">
                        {feed.user.username}
                      </span>
                    </div>
                  </article>
                </section>
              </div>
            );
          })
        : ""}
    </div>
  );
}

export default Home;
