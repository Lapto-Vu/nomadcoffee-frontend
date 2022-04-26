import { gql, useMutation } from "@apollo/client";
import {
  faHashtag,
  faImage,
  faLocationDot,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SEE_COFFEESHOPS_QR } from "./Home";

interface IFormValues {
  name: string;
  categories: string;
  latitude: string;
  longitude: string;
  internal: string;
  photoFiles: string;
}

const CREATE_COFFEESHOP_MT = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String
    $longitude: String
    $photoFiles: [Upload]
    $categories: String
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      photoFiles: $photoFiles
      categories: $categories
    ) {
      ok
      error
      type
    }
  }
`;

interface IResultData {
  createCoffeeShop: {
    ok: boolean;
    error?: string;
    type: "internal";
  };
}

function Add() {
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IFormValues> = (data) =>
    createCoffeeShop({
      variables: { ...data },
      refetchQueries: [{ query: SEE_COFFEESHOPS_QR }],
    });
  const onCompleted = (data: IResultData) => {
    const {
      createCoffeeShop: { ok, error, type },
    } = data;
    if (!ok) {
      setError(type, { message: error });
    } else {
      navigate("/");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm<IFormValues>({
    mode: "onBlur",
  });

  const [createCoffeeShop] = useMutation(CREATE_COFFEESHOP_MT, { onCompleted });

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col gap-2">
      <form
        className="relative box-default h-[30rem] flex-col pt-12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-main">새 커피숍 만들기</div>
        <div className="flex w-44 text-[0.65rem] flex-start items-center gap-1">
          <FontAwesomeIcon icon={faPen} /> 커피숍의 이름을 알려주세요.
        </div>
        <input
          {...register("name", {
            required: "커피숍의 이름을 적어야 합니다.",
          })}
          placeholder="이름"
          type="text"
          className={`form-input-text mb-2  ${
            errors.name && "ring-pink-400 focus:ring-2 focus:ring-pink-400"
          }`}
        ></input>
        <div className="flex w-44 text-[0.65rem] flex-start items-center gap-1">
          <FontAwesomeIcon icon={faHashtag} /> 카테고리를 정해주세요.
        </div>
        <input
          {...register("categories")}
          placeholder="카테고리"
          type="text"
          className={`form-input-text mb-2  ${
            errors.categories &&
            "ring-pink-400 focus:ring-2 focus:ring-pink-400"
          }`}
        ></input>
        <div className="flex w-44 text-[0.65rem] flex-start items-center gap-1">
          <FontAwesomeIcon icon={faLocationDot} />
          정확한 위치를 알려주세요.
        </div>
        <input
          {...register("latitude", {
            pattern: {
              value:
                /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/,
              message: "정확한 위도를 적어야 합니다.",
            },
          })}
          placeholder="위도"
          type="text"
          className={`form-input-text ${
            errors.latitude && "ring-pink-400 focus:ring-2 focus:ring-pink-400"
          }`}
        ></input>
        <input
          {...register("longitude", {
            pattern: {
              value:
                /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/,
              message: "정확한 경도를 적어야 합니다.",
            },
          })}
          placeholder="경도"
          type="text"
          className={`form-input-text mb-2 ${
            errors.longitude && "ring-pink-400 focus:ring-2 focus:ring-pink-400"
          }`}
        ></input>
        <div className="flex w-44 text-[0.65rem] flex-start items-center gap-1">
          <FontAwesomeIcon icon={faImage} /> 사진을 올려주세요.
        </div>
        <input
          {...register("photoFiles")}
          type="file"
          className="file:text-[0.7rem] text-[0.7rem] file:font-normal m-1 ml-8 file:border-0 file:rounded-sm file:bg-blue-50 file:text-gray-400 hover:file:bg-blue-100 file:cursor-pointer"
        ></input>
        <button disabled={!isValid} className="form-button">
          만들기
        </button>
        <div className="form-error-message">
          {errors?.name?.message ||
            errors?.latitude?.message ||
            errors.longitude?.message ||
            errors?.internal?.message}
        </div>
      </form>
    </div>
  );
}

export default Add;
