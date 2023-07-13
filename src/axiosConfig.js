import axios from "axios";
import { getSession } from "next-auth/react";

const base_url = process.env.NEXT_PUBLIC_API_URL;

const ApiClient = () => {
  const defaultOptions = {
    baseURL: base_url,
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async (request) => {
    const session = await getSession();
    request.headers.Accept = "application/json;charset=UTF-8";
    if (session) {
      request.headers.Authorization = `Token ${session?.user?.auth_token}`;
    }
    return request;
  });

  return instance;
};

export default ApiClient();
