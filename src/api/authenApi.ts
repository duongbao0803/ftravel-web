import { AxiosResponse } from "axios";
import axiosClient from "@/config/axiosClient";
import {
  SigninValues,
  SignupValues,
  responseTokenProps,
} from "@/interfaces/interfaces";

const login = (formValues: SigninValues) => {
  return axiosClient.post("/api/authen/login", formValues);
};

const signUp = (formValues: SignupValues) => {
  return axiosClient.post("/api/authen/register", formValues);
};

const requestRefreshToken = (
  jwtToken: string,
): Promise<AxiosResponse<responseTokenProps>> => {
  return axiosClient.post<responseTokenProps>(
    "/api/authen/refresh-token",
    jwtToken,
  );
};

const getInfoUser = () => {
  return axiosClient.get("/api/authen/test-admin");
};

export { login, getInfoUser, signUp, requestRefreshToken };
