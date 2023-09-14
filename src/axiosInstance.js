import axios from "axios";
import axiosRetry from "axios-retry";
import { getSession } from "next-auth/react";

const base_url = process.env.NEXT_PUBLIC_API_URL;

const ApiClient = (session) => {
  const defaultOptions = {
    baseURL: base_url,
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async (request) => {
    // const session = await getSession(context);
    console.log(session);
    request.headers.Accept = "application/json;charset=UTF-8";
    if (session) {
      request.headers.Authorization = `Token ${session?.user?.auth_token}`;
    }
    return request;
  });

  // axiosRetry(instance, { retries: 3, retryDelay: axiosRetry.exponentialDelay });
  return instance;
};

export default async function getClient(context) {
  const session = await getSession(context);
  return ApiClient(session);
}
