import { gql, useQuery } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
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
      }
    }
  }
`;

interface IFormValues {
  name: string;
  categories: string;
  latitude: string;
  longitude: string;
  internal: string;
}
function Shop() {
  const { id } = useParams();
  // 처음 id 는 undefined 이다. undefined 인 채로 useQuery 를 하니 에러가 났다. 아닐 때 쿼리를 전송해야 한다. 그렇게 했다.
  const parseId = id && +id;
  const { data, loading } = useQuery(SEE_COFFEESHOP_QR, {
    variables: { id: parseId },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormValues>({
    mode: "onBlur",
  });
  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    console.log(data);
  };

  const set = data?.seeCoffeeShop?.coffeeShop.categories.reduce(
    (pr: any, cr: any) => ({ slug: `${pr.slug} ${cr.slug}` })
  );

  return (
    <div className="h-[calc(100vh-100px)] w-screen flex justify-center items-center flex-col gap-2">
      {loading ? (
        ""
      ) : (
        <form
          className="relative box-default h-[32rem] flex-col pt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <img
            src={data?.seeCoffeeShop?.coffeeShop.photos[0].url}
            alt={data?.seeCoffeeShop?.coffeeShop.photos[0].id}
            className="h-36 mb-8"
          />
          <input
            {...register("name", {
              required: "커피숍의 이름을 적어야 합니다.",
              value: data?.seeCoffeeShop?.coffeeShop.name,
            })}
            placeholder="이름"
            type="text"
            className={`form-input-text ${
              errors.name && "ring-pink-400 focus:ring-2 focus:ring-pink-400"
            }`}
          ></input>
          <input
            {...register("categories", {
              value: set?.slug,
            })}
            placeholder="카테고리"
            type="text"
            className={`form-input-text ${
              errors.categories &&
              "ring-pink-400 focus:ring-2 focus:ring-pink-400"
            }`}
          ></input>
          <input
            {...register("latitude", {
              value: data?.seeCoffeeShop?.coffeeShop.latitude,
              pattern: {
                value:
                  /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/,
                message: "정확한 위도를 적어야 합니다.",
              },
            })}
            placeholder="위도"
            type="text"
            className={`form-input-text ${
              errors.latitude &&
              "ring-pink-400 focus:ring-2 focus:ring-pink-400"
            }`}
          ></input>
          <input
            {...register("longitude", {
              value: data?.seeCoffeeShop?.coffeeShop.longitude,
              pattern: {
                value:
                  /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/,
                message: "정확한 경도를 적어야 합니다.",
              },
            })}
            placeholder="경도"
            type="text"
            className={`form-input-text mb-2 ${
              errors.longitude &&
              "ring-pink-400 focus:ring-2 focus:ring-pink-400"
            }`}
          ></input>
          <input
            type="file"
            className="file:text-[0.7rem] text-[0.7rem] file:font-normal m-1 ml-8 file:border-0 file:rounded-sm file:bg-blue-50 file:text-gray-400 hover:file:bg-blue-100 file:cursor-pointer"
          ></input>
          <div className="w-48 flex justify-around gap-4">
            <button disabled={!isValid} className="form-button w-20">
              수정하기
            </button>
            <button
              disabled={!isValid}
              className="form-button w-20 disabled:bg-pink-100 disabled:ring-pink-200 bg-red-500 ring-red-400"
            >
              삭제하기
            </button>
          </div>
          <div className="form-error-message">
            {errors?.name?.message ||
              errors?.latitude?.message ||
              errors.longitude?.message ||
              errors?.internal?.message}
          </div>
        </form>
      )}
    </div>
  );
}

export default Shop;
