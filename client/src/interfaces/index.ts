import { ImageSourcePropType } from "react-native";

interface ICover {
  details: string;
  category: string;
  bgSrc: ImageSourcePropType;
}

interface IEvent {
  title: string;
  description: string;
  bgUri: string;
}

interface ILoginFormValues {
  email: string;
  password: string;
}

interface IRegisterFormValues {
  name: string;
  email: string;
  password: string;
}

interface IMovieData {
  id: number;
  poster_path: string;
  original_title?: string;
  original_name?: string;
  overview?: string;
  release_date?: string;
  first_air_date?: string;
  vote_count?: number;
}

interface IUpdatePasswordFormValues {
  currentPassword: string;
  newPassword: string;
}

export {
  ICover,
  IEvent,
  ILoginFormValues,
  IRegisterFormValues,
  IMovieData,
  IUpdatePasswordFormValues,
};
