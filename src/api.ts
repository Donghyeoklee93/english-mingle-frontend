import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

import { formatDate } from "./lib/utils";

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

export const kakaoLogin = (code: string) =>
  instance
    .post(
      `users/kakao`,
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);

export interface IUsernameLoginVariables {
  username: string;
  password: string;
}
export interface IUsernameLoginSuccess {
  ok: string;
}
export interface IUsernameLoginError {
  error: string;
}

export const usernameLogIn = ({
  username,
  password,
}: IUsernameLoginVariables) =>
  instance.post(
    `users/log-in`,
    { username, password },
    {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    }
  );

export interface IUploadOnlineVariables {
  name: string;
  price: number;
  description: string;
  kind: string;
  subjects: number[];
  level: number;
}

export const getSubjects = () =>
  instance.get(`subjects/`).then((response) => response.data);

export const getLevels = () =>
  instance.get(`levels/`).then((response) => response.data);

export const uploadOnline = (variables: IUploadOnlineVariables) =>
  instance
    .post(`onlines/`, variables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const getUploadURL = () =>
  instance
    .post(`medias/photos/get-url`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

type CheckBookingQueryKey = [string, string?, Date[]?];

export const checkBooking = ({
  queryKey,
}: QueryFunctionContext<CheckBookingQueryKey>) => {
  const [_, onlinePk, dates] = queryKey;
  if (dates) {
    const [firstDate, secondDate] = dates;
    const timeFrom = formatDate(firstDate);
    const timeTo = formatDate(secondDate);
    return instance
      .get(
        `onlines/${onlinePk}/bookings/check?time_from=${timeFrom}&time_to=${timeTo}`
      )
      .then((response) => response.data);
  }
};
