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

export { ICover, IEvent, ILoginFormValues, IRegisterFormValues };
