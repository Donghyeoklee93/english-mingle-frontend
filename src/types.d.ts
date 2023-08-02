export interface IOnline {
  pk: number;
  name: string;
  price: number;
  description: string;
  rating: number;
  is_owner: boolean;
  reviews_count: number;
  photos: IPhoto[];
}

export interface IPhoto {
  pk: string;
  file: string;
  description: string;
}

export interface IUser {
  last_login: string;
  username: string;
  email: string;
  date_joined: string;
  avatar: string;
  name: string;
  is_host: boolean;
  gender: string;
}

export interface IOnlineDetail {
  id: number;
  tutor: IUser;
  level: string;
  rating: number;
  is_owner: boolean;
  reviews_count: number;
  photos: IPhoto[];
  created_at: string;
  updated_at: string;
  name: string;
  price: number;
  description: string;
  kind: string;
  start: string;
  end: string;
  subjects: Isubject[];
}

export interface Isubject {
  name: string;
  description: string;
}

export interface IReview {
  user: IUser;
  textArea: string;
  rating: number;
}

// 아래부터는 노마드코더꺼
export interface IRoomPhotoPhoto {
  pk: string;
  file: string;
  description: string;
}

export interface IRoomList {
  pk: number;
  name: string;
  country: string;
  city: string;
  price: number;
  rating: number;
  is_owner: boolean;
  photos: IRoomPhotoPhoto[];
}

export interface IRoomOwner {
  name: string;
  avatar: string;
  username: string;
}

export interface IAmenity {
  name: string;
  description: string;
}

export interface IRoomDetail extends IRoomList {
  created_at: string;
  updated_at: string;
  rooms: number;
  toilets: number;
  description: string;
  address: string;
  pet_friendly: true;
  kind: string;
  is_owner: boolean;
  is_liked: boolean;
  category: {
    name: string;
    kind: string;
  };
  owner: IRoomOwner;
  amenities: IAmenity[];
}
