import { AxiosResponse } from "axios";
import axiosClient from "@/config/axiosClient";
import {
  ResponseTokenProps,
  SigninValues,
  SignupValues,
} from "@/types/auth.types";

const login = (formValues: SigninValues) => {
  return axiosClient.post("/api/authen/login", formValues);
};

const signUp = (formValues: SignupValues) => {
  return axiosClient.post("/api/authen/register", formValues);
};

const requestRefreshToken = (
  jwtToken: string,
): Promise<AxiosResponse<ResponseTokenProps>> => {
  return axiosClient.post<ResponseTokenProps>(
    "/api/authen/refresh-token",
    jwtToken,
  );
};

const getInfoUser = () => {
  return axiosClient.get("/api/authen/test-admin");
};

export { login, getInfoUser, signUp, requestRefreshToken };
