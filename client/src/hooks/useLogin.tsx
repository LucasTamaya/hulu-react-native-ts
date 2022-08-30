// import axios from "axios";
// import { useMutation } from "@tanstack/react-query";

// import { ILoginFormValues } from "../interfaces";
// import { BASE_URL } from "../utils/urlTemplate";

// const handleLogin = async ({
//   email,
//   password,
// }: ILoginFormValues): Promise<any> => {
//   const { data } = await axios.post(`${BASE_URL}/login`, {
//     email,
//     password,
//   });
//   return data;
// };

// export const useLogin = (email: string, password: string) => {
//   return useMutation(() => handleLogin({ email, password }));
// };
