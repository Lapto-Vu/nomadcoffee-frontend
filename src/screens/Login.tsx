import { gql, useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogUserIn } from "../apollo";
import { Helmet } from "react-helmet";

interface IFormValues {
  username: string;
  password: string;
  internal: string;
}

const LOGIN_MT = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
      type
    }
  }
`;

interface IResultData {
  login: {
    ok: boolean;
    error?: string;
    token?: string;
    type: "username" | "password" | "internal";
  };
}

function Login() {
  const onCompleted = (data: IResultData) => {
    const {
      login: { ok, error, token, type },
    } = data;

    if (!ok) {
      setError(type, { message: error });
    }
    if (token) {
      LogUserIn(token);
      navigate("/");
    }
  };

  const [login] = useMutation(LOGIN_MT, { onCompleted });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm<IFormValues>({
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    const { username, password } = data;
    login({ variables: { username, password } });
  };

  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="w-screen h-screen pb-12 flex justify-center items-center flex-col gap-2">
      <Helmet>
        <title>로그인 · Coffeegram</title>
      </Helmet>
      <form
        className="relative box-default h-96 flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-title">Coffeegram</div>
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
            required: "비밀번호는 적어도 8자 이상이어야 합니다.",
            minLength: {
              value: 8,
              message: "비밀번호는 적어도 8자 이상이어야 합니다.",
            },
          })}
          placeholder="비밀번호"
          type="password"
          className={`form-input-text ${
            errors.password && "ring-pink-400 focus:ring-2 focus:ring-pink-400"
          }`}
        ></input>
        <button disabled={!isValid} className="form-button">
          로그인
        </button>
        <div className="form-error-message">
          {errors?.username?.message ||
            errors?.password?.message ||
            errors?.internal?.message}
        </div>
        <div className="form-error-message text-emerald-500 animate-gone">
          {location.state}
          {""}
        </div>
      </form>
      <div className="box-default h-16 text-xs">
        <div>계정이 없으신가요?</div>
        <Link to="/sign" className="text-blue-400">
          가입하기
        </Link>
      </div>
    </div>
  );
}
export default Login;
