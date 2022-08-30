import React from "react";
import { SkypeIndicator } from "react-native-indicators";

interface Props {
  size: number;
  color: string;
}

export const Loader: React.FC<Props> = ({ size, color }) => {
  return <SkypeIndicator color={color} size={size} />;
};
