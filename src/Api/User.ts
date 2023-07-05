import { IUser } from "../States/UserState.ts";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";

export const LoginMutation = useMutation<
  IUser,
  AxiosError,
  { email: string; password: string }
>(
  "user",
  (data) =>
    axios
      .post("123", data, {
        withCredentials: true,
      })
      .then((response) => response.data),
  {
    onMutate() {},
    onSuccess(data) {
      localStorage.setItem("accessToken", data?.accessToken);
    },
    onError(error) {
      // setLogInError(error.response?.data?.code === 401);
      alert("로그인에 실패하였습니다.");
    },
  }
);
