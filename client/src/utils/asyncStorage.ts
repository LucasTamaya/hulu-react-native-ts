import AsyncStorage from "@react-native-async-storage/async-storage";

// permet d'enregistrer le user id dans une sorte de localStorage comme en JS
const setUserId = async (uid: string): Promise<void> => {
  try {
    await AsyncStorage.setItem("@user_id", uid);
  } catch (error: any) {
    console.error(error.mesage);
  }
};

// permet de récupérer le user id depuis le localStorage
const getUserId = async (): Promise<string | undefined> => {
  try {
    const value = await AsyncStorage.getItem("@user_id");
    if (value !== null) {
      return value;
    } else {
      console.error("error in the getAsyncData function !");
      console.log(value);
    }
  } catch (error: any) {
    console.error(error.message);
  }
};

export { setUserId, getUserId };
