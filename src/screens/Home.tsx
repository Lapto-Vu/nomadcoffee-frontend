import { gql, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const SEE_COFFEESHOPS_QR = gql`
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
          username
        }
        createdAt
      }
    }
  }
`;

function Home() {
  const { data } = useQuery(SEE_COFFEESHOPS_QR);
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-row gap-4">
      <Helmet>
        <title>Coffeegram</title>
      </Helmet>
      {data?.seeCoffeeShops?.coffeeShop?.map((feed: any) => (
        <div
          key={feed.id}
          className="box-default w-48 flex-col cursor-pointer py-6"
          onClick={() => navigate(`/shop/${feed.id}`)}
        >
          <div className="h-48 w-24 flex justify-center items-center">
            <img src={feed.photos[0].url} alt={feed.photos[0].id} />
          </div>
          <div className="flex gap-2 text-sm">
            <div>{feed.name}</div>-<div>{feed.user.username}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
