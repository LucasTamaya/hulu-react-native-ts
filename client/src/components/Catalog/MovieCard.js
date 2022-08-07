import { View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { getDoc } from "firebase/firestore";

import MovieDetails from "./MovieDetails";

const MovieCard = ({ data, docRef }) => {
  const TMDB_IMG_URL = "https://image.tmdb.org/t/p/original";

  const [showDetails, setShowDetails] = useState(false);
  const [save, setSave] = useState(false);

  // récupération de la liste d'IDS des films sauvegardés
  const getSavedFilmIds = async () => {
    const docSnap = await getDoc(docRef);
    // si le document existe dans firebase
    if (docSnap.exists()) {
      const filmIds = docSnap.data().moviesList;
      // si la liste est vide
      if (filmIds.length === 0) {
        return;
      }
      // si liste non vide
      // on compare l'id du film qu'on observe avec celui de la liste dans firebase, afin de voir si il a été sauvegardé ou non, pour adapter l'icon Heart dans MovieDetails
      filmIds.map((id) => {
        if (id === data.id) {
          setSave((prev) => !prev);
          return;
        }
      });
    }
    // si le document n'existe pas
    if (!docSnap.exists()) {
      console.log("erreur, aucun document reçu");
    }
  };

  useEffect(() => {
    getSavedFilmIds();
  }, []);

  return (
    <View>
      {/* Si le film reçu ne possède pas d'affiche de couverture, on ne l'affiche pas */}
      {!data.poster_path && <></>}

      {/* Sinon on l'affiche */}
      {data.poster_path && (
        <View className="mt-10 px-7">
          <TouchableOpacity
            className="flex-row justify-center"
            onPress={() => setShowDetails(!showDetails)}
          >
            <View className="w-[300px] h-[450px] relative">
              <Image
                source={{ uri: `${TMDB_IMG_URL}${data.poster_path}` }}
                className="w-full h-full"
                alt="Movie image"
              />

              {/* Détails du film */}
              {showDetails && (
                <MovieDetails
                  data={data}
                  save={save}
                  setSave={setSave}
                  docRef={docRef}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MovieCard;
