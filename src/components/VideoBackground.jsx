import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constant";

const VideoBackground = ({ movieId }) => {
  const fetchTrailer = async () => {
    const result = await fetch(
      "https://api.themoviedb.org/3/movie/957452/videos?language=en-US",
      API_OPTIONS
    );
    const json = await result.json();
    // console.log(json);
    const trailer = json?.results?.filter((video) => video.type === "Trailer");
    // console.log("T", trailer);
    const mainTrailer = trailer.length ? trailer[0] : json?.results[0];
    console.log(mainTrailer);
  };
  useEffect(() => {
    fetchTrailer();
  }, []);

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/4CLE3pWAAr8?si=1aF-44YgSMyrTGkR"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
