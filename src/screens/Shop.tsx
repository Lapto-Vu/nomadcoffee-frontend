import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const SEE_COFFEESHOP_QR = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
      ok
      error
      coffeeShop {
        id
        name
        longitude
        latitude
        categories {
          slug
        }
        photos {
          id
          url
        }
        user {
          id
          username
        }
      }
    }
  }
`;

function Shop() {
  const { id } = useParams();
  // 처음 id 는 undefined 이다. undefined 인 채로 useQuery 를 하니 에러가 났다. 아닐 때 쿼리를 전송해야 한다. 그렇게 했다.
  const parseId = id && +id;
  const { data, loading } = useQuery(SEE_COFFEESHOP_QR, {
    variables: { id: parseId },
  });

  const set = data?.seeCoffeeShop?.coffeeShop.categories.reduce(
    (pr: any, cr: any) => ({ slug: `${pr.slug} ${cr.slug}` })
  );

  return (
    <div className="h-[calc(100vh-100px)] w-screen flex justify-center items-center flex-col gap-2">
      {loading ? (
        ""
      ) : (
        <div className="relative box-default h-[32rem] flex-col pt-4">
          <img
            src={data?.seeCoffeeShop?.coffeeShop.photos[0].url}
            alt={data?.seeCoffeeShop?.coffeeShop.photos[0].id}
            className="h-36 mb-8"
          />
          <div>{data?.seeCoffeeShop?.coffeeShop.name}</div>
          <div>{set?.slug}</div>
          <div>{data?.seeCoffeeShop?.coffeeShop.user.username}</div>
        </div>
      )}
    </div>
  );
}

export default Shop;
