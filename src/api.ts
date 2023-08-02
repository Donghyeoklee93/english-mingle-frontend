import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
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

// get me (log in)
export const getMe = () =>
  instance.get(`users/me`).then((response) => response.data);

// log out
export const logOut = () =>
  instance
    .post(`users/log-out`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const githubLogIn = (code: string) =>
  instance
    .post(
      `users/github`,
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);
