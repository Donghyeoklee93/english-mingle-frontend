import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

import { formatDate } from "./lib/utils";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
});

//online
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

//offline
export const getOfflines = () =>
  instance.get("offlines/").then((response) => response.data);

export const getOffline = ({ queryKey }: QueryFunctionContext) => {
  const [_, offlinePk] = queryKey;
  return instance.get(`onlines/${offlinePk}`).then((response) => response.data);
};

export const getOfflineReviews = ({ queryKey }: QueryFunctionContext) => {
  const [_, offlinePk] = queryKey;
  return instance
    .get(`offlines/${offlinePk}/reviews`)
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

// sign in
export interface ISignUpVariables {
  name: string;
  email: string;
  username: string;
  password: string;
  password2: string;
}

export interface ISignUpSuccess {
  ok: string;
}

export interface ISignUpError {
  response: { data: { error: string } };
}

export const SignUp = ({
  name,
  email,
  username,
  password,
  password2,
}: ISignUpVariables) =>
  instance
    .post(
      "users/sign-up",
      { name, email, username, password, password2 },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

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

//online
export interface IUploadOnlineVariables {
  name: string;
  price: number;
  description: string;
  kind: string;
  subjects: number[];
  level: number;
}

//offline
export interface IUploadOfflineVariables {
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

//online
export const uploadOnline = (variables: IUploadOnlineVariables) =>
  instance
    .post(`onlines/`, variables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

//offline
export const uploadOffline = (variables: IUploadOfflineVariables) =>
  instance
    .post(`offlines/`, variables, {
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

//online
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

//offline
export const checkBookingOffline = ({
  queryKey,
}: QueryFunctionContext<CheckBookingQueryKey>) => {
  const [_, offlinePk, dates] = queryKey;
  if (dates) {
    const [firstDate, secondDate] = dates;
    const timeFrom = formatDate(firstDate);
    const timeTo = formatDate(secondDate);
    return instance
      .get(
        `offlines/${offlinePk}/bookings/check?time_from=${timeFrom}&time_to=${timeTo}`
      )
      .then((response) => response.data);
  }
};
