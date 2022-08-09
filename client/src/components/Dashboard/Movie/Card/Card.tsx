import { View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { AppContext, AppContextType } from "../../../../contexts/AppContext";
import { IMovieData } from "../../../../interfaces";
import Details from "../Details";

interface Props {
  data: IMovieData;
}

export const Card: React.FC<Props> = ({ data }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [save, setSave] = useState(false);

  const { savedFilmIds } = useContext(AppContext) as AppContextType;

  const TMDB_IMG_URL = "https://image.tmdb.org/t/p/original";

  console.log(savedFilmIds);

  useEffect(() => {
    // on compare l'id du film qu'on observe avec celui de la liste récupérée au préalable, afin de voir si il a été sauvegardé ou non, pour adapter l'icon Heart dans MovieDetails
    savedFilmIds.map((id) => {
      if (id === data.id) {
        console.log(data.id);
        setSave((prev) => !prev);
        return;
      }
    });
  }, []);

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
