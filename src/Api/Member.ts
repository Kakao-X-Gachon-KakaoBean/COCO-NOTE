// import { IUser } from "../States/userState.ts";
// import { useMutation } from "react-query";
// import axios, { AxiosError } from "axios";
//
// export const MemberSubmitMutation = useMutation<
//   IUser,
//   AxiosError,
//   { email: string }
// >(
//   "SubmitEmail",
//   (index) =>
//     axios
//       .post(`localhost:3000/local/login`, index, {
//         withCredentials: true,
//       })
//       .then((response) => response.index),
//   {
//     onMutate() {},
//     onSuccess(index) {
//       // setEmail("");
//     },
//     onError(error) {
//       console.log(error);
//       alert("전송에 실패하였습니다.");
//     },
//   }
// );
