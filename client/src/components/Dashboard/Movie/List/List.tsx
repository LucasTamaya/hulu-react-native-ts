import { Dimensions, ScrollView, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";

import Card from "../Card";
import Loader from "../../../Animations/Loader";
import { AppContext, AppContextType } from "../../../../contexts/AppContext";
import { IMovieData } from "../../../../interfaces";
import { useAllMovies } from "../../../../hooks/useAllMovies";

export const List: React.FC = () => {
  const { index } = useContext(AppContext) as AppContextType;

  const windowHeight = Dimensions.get("window").height;

  const { data, refetch, isLoading, isError, isSuccess, isRefetching } =
    useAllMovies(index);

  useEffect(() => {
    refetch();
  }, [index]);

  return (
    <ScrollView className="mb-14" testID="movieList">
      {/* si il y a une erreur lors de la requête, on affiche un message d'erreur */}
      {isError && (
        <Text className="text-white text-2xl mt-10 ml-10">
          Une erreur est survenue au niveau du serveur interne
        </Text>
      )}

      {/* pendant le chargement de la data, on affiche un loader */}
      {isLoading ||
        (isRefetching && (
          <View
            className="absolute top-0 left-0 z-10 w-full flex flex-row justify-center items-center"
            style={{ height: windowHeight / 2 }}
            testID="loading"
          >
            <Loader size={80} color="#00ed82" />
          </View>
        ))}

      {/* lorsque la data est arrivé, on affiche les films */}
      {isSuccess &&
        data.map((movie: IMovieData) => <Card key={movie.id} data={movie} />)}
    </ScrollView>
  );
};
