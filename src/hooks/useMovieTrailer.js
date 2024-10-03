import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

// Fetch movie data and update the movie trailer with store
const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const fetchTrailer = async () => {
    const result = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await result.json();
    const trailer = json?.results?.filter((video) => video.type === "Trailer");
    const mainTrailer = trailer.length ? trailer[0] : json?.results[0];
    dispatch(addTrailerVideo(mainTrailer));
  };
  useEffect(() => {
    fetchTrailer();
  }, []);
};
export default useMovieTrailer;
