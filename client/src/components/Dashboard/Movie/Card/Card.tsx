import { View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from "react";

import { UserIdContext } from "../../../../Contexts/UserIdContext";
import { IMovieData } from "../../../../interfaces";
import Details from "../Details";

interface Props {
  data: IMovieData;
}

export const Card: React.FC<Props> = ({ data }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [save, setSave] = useState(false);

  const { userId } = useContext(UserIdContext);

  const TMDB_IMG_URL = "https://image.tmdb.org/t/p/original";

  // récupération de la liste d'IDS des films sauvegardés
  // fetch ers mon api
  // si liste non vide
  // on compare l'id du film qu'on observe avec celui de la liste dans firebase, afin de voir si il a été sauvegardé ou non, pour adapter l'icon Heart dans MovieDetails
  
  
  // si le document n'existe pas

  // useEffect(() => {
  //   getSavedFilmIds();
  // }, []);

  return (
    <View>
      {/* Si le film reçu ne possède pas d'affiche de couverture, on ne l'affiche pas */}
      {!data.poster_path && <></>}

      {/* Sinon on l'affiche */}
      {data.poster_path && (
        <View className="mt-10 px-7">
          <TouchableOpacity onPress={() => setShowDetails(!showDetails)}>
            <View className="flex-row justify-center">
              <View className="w-[300px] h-[450px] relative">
                <Image
                  source={{ uri: `${TMDB_IMG_URL}${data.poster_path}` }}
                  className="w-full h-full"
                />

                {/* Détails du film */}
                {showDetails && (
                  <Details data={data} save={save} setSave={setSave} />
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
