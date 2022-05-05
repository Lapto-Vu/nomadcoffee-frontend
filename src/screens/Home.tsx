/* eslint-disable jsx-a11y/alt-text */
import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Avatar from "../Components/Avatar";

export const SEE_COFFEESHOPS_QR = gql`
  query seeCoffeeShops($page: Int) {
    seeCoffeeShops(page: $page) {
      id
      name
      photos {
        id
        url
      }
      categories {
        id
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
`;

function Home() {
  const { data, loading } = useQuery(SEE_COFFEESHOPS_QR, {
    variables: { page: 78 },
  });
  const navigate = useNavigate();
  return (
    <div className="w-screen h-[calc(100vh-100px)] grid grid-cols-5 grid-rows-3 gap-4 p-4">
      <Helmet>
        <title>Coffeegram</title>
      </Helmet>
      {!loading
        ? data?.seeCoffeeShops?.map((feed: any) => {
            return (
              <div
                key={feed.id}
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
                    {feed.categories.map((i: { slug: string; id: number }) => {
                      return (
                        <React.Fragment key={"" + i.id}>
                          <span className="text-gray-400 text-xs">
                            {i.slug + "\u00a0\u00a0"}
                          </span>
                        </React.Fragment>
                      );
                    })}
                  </article>
                  <article className="h-1/2 w-full flex items-end justify-between px-1 pb-[2px]">
                    <span className="text-xs">{feed.name}</span>
                    <div className="flex gap-2">
                      <span className="text-xs">{feed.user.username}</span>
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
