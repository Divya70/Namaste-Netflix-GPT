import { CiPlay1 } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";
const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-36 px-12">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4">{overview}</p>
      <div className="flex gap-3">
        <button className="text-white bg-gray-500 bg-opacity-50 text-xl rounded-lg px-10 p-2 flex items-center gap-1">
          <CiPlay1 /> Play
        </button>
        <button className="text-white bg-gray-500 bg-opacity-50 text-xl rounded-lg px-8 p-2 flex items-center gap-1">
          <CiCircleInfo /> More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
