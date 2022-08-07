import { StyleSheet } from "react-native";
import AnimatedLoader from "react-native-animated-loader";

export const Data = () => {
  return (
    <AnimatedLoader
      visible={true}
      source={require("../../utils/lottieLoader.json")}
      animationStyle={styles.lottie}
      speed={1}
    ></AnimatedLoader>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});
