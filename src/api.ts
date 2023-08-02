import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
});

export const getOnlines = () =>
  instance.get("onlines/").then((response) => response.data);

export const getOnline = ({ queryKey }: QueryFunctionContext) => {
  const [_, onlinePk] = queryKey;
  return instance.get(`onlines/${onlinePk}`).then((response) => response.data);
};

export const getOnlineReviews = ({ queryKey }: QueryFunctionContext) => {
  const [_, onlinePk] = queryKey;
  return instance
    .get(`onlines/${onlinePk}/reviews`)
    .then((response) => response.data);
};
