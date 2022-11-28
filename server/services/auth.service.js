import { authServer } from "./axios.config.js";

export const loginUser = async (userLoginParams) => {
  const { data } = await authServer.post("/user/login", {
    ...userLoginParams,
  });
  console.log(data)
  const { jwt, userDetails } = data;
  return userDetails;
};
