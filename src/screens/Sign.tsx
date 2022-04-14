import { gql, useMutation } from "@apollo/client";
import { Helmet } from "react-helmet";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

interface IFormValues {
  email: string;
  username: string;
  name: string;
  password: string;
  passwordAgain: string;
  internal: string;
}

const CREATE_ACCOUNT_MT = gql`
  mutation createAccount(
    $username: String!
    $name: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      username: $username
      password: $password
      name: $name
      email: $email
    ) {
      ok
      error
      type
    }
  }
`;

interface IResultData {
  createAccount: {
    ok: boolean;
    error?: string;
    type: "username" | "email" | "internal";
  };
}

function Sign() {
  const onCompleted = (data: IResultData) => {
    const {
      createAccount: { ok, error, type },
    } = data;

    if (!ok) {
      setError(type, { message: error });
    } else {
      navigate("/login", {
        state: "정상적으로 가입되었습니다. 로그인하세요.",
      });
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
  } = useForm<IFormValues>({
    mode: "onTouched",
  });

  const [createAccount] = useMutation(CREATE_ACCOUNT_MT, { onCompleted });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    const { name, password, username, email } = data;
    createAccount({ variables: { name, password, username, email } });
  };

  return (
    <div className="w-screen h-screen pb-12 flex justify-center items-center flex-col gap-2">
      <Helmet>
        <title>회원가입 · Coffeegram</title>
      </Helmet>
      <form
        className="box-default h-96 flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-title">Coffeegram</div>
        <input
          {...register("email", {
            required: "이메일을 형식에 맞춰 작성해 주십시오.",
            pattern: {
              value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
              message: "이메일 형식에 맞춰 작성해 주십시오.",
            },
          })}
          placeholder="이메일 주소"
          type="text"
          className={`form-input-text ${
            errors.email && "ring-pink-400 focus:ring-2 focus:ring-pink-400"
          }`}
        ></input>
        <input
          {...register("name", {
            required: "성명을 반드시 작성해야 합니다.",
          })}
          placeholder="성명"
          type="text"
          className={`form-input-text ${
            errors.name && "ring-pink-400 focus:ring-2 focus:ring-pink-400"
          }`}
        ></input>
        <input
          {...register("username", {
            required: "아이디는 적어도 3자 이상이어야 합니다.",
            minLength: {
              value: 3,
              message: "아이디는 적어도 3자 이상이어야 합니다.",
            },
          })}
          placeholder="아이디"
          type="text"
          className={`form-input-text ${
            errors.username && "ring-pink-400 focus:ring-2 focus:ring-pink-400"
          }`}
        ></input>
        <input
          {...register("password", {
            required: "비밀번호는 8자 이상, 숫자와 특수문자를 포함해야 합니다.",
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              message:
                "비밀번호는 8자 이상, 숫자와 특수문자를 포함해야 합니다.",
            },
          })}
          placeholder="비밀번호"
          type="password"
          className={`form-input-text ${
            errors.password && "ring-pink-400 focus:ring-2 focus:ring-pink-400"
          }`}
        ></input>
        <input
          {...register("passwordAgain", {
            required: "비밀번호가 같지 않습니다.",
            validate: (value) =>
              value === getValues("password") || "비밀번호가 같지 않습니다.",
          })}
          placeholder="비밀번호 재입력"
          type="password"
          className={`form-input-text ${
            errors.passwordAgain &&
            "ring-pink-400 focus:ring-2 focus:ring-pink-400"
          }`}
        ></input>
        <button
          disabled={!isValid}
          className="form-button disabled:bg-blue-50 disabled:text-slate-300"
        >
          가입
        </button>
        <div className="form-error-message">
          {errors?.email?.message ||
            errors?.name?.message ||
            errors?.username?.message ||
            errors?.password?.message ||
            errors?.passwordAgain?.message ||
            errors?.internal?.message}
        </div>
      </form>
      <div className="box-default h-16 text-xs">
        <div>계정이 있으신가요?</div>
        <Link to="/login" className="text-blue-400">
          로그인
        </Link>
      </div>
    </div>
  );
}
export default Sign;
