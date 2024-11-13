import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { abbreviateNumber } from "js-abbreviation-number";

import { fetchDataFromApi } from "../utils/Api";
import { Context } from "../context/ContextApi";
import SuggestionVideoCard from "./SuggestionVideoCard";
import LikeButton from "./LikeButton";

const VideoDetails = () => {
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { setLoading } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.add("custom-h");

    const handleBeforeUnload = (event) => {
      localStorage.setItem("pageReloaded", "true");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const reloaded = localStorage.getItem("pageReloaded");
    if (reloaded) {
      localStorage.removeItem("pageReloaded");
      navigate("/");
    } else {
      fetchVideoDetails();
      fetchRelatedVideos();
    }
  }, [id, navigate]);

  const fetchVideoDetails = async () => {
    setLoading(true);
    try {
      const res = await fetchDataFromApi(`video/details/?id=${id}`);
      console.log("Video Details:", res);
      setVideo(res);
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
    setLoading(false);
  };

  const fetchRelatedVideos = async () => {
    setLoading(true);
    try {
      const res = await fetchDataFromApi(`video/related-contents/?id=${id}`);
      console.log("Related Videos:", res);
      setRelatedVideos(res.contents || []);
    } catch (error) {
      console.error("Error fetching related videos:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log("Related Videos State:", relatedVideos);
  }, [relatedVideos]);

  return (
    <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-black">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
          <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            {video ? (
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                controls
                width="100%"
                height="100%"
                style={{ backgroundColor: "#000000" }}
                playing={true}
                onError={(e) => console.error("Error playing video:", e)}
              />
            ) : (
              <div className="text-white">Loading video...</div>
            )}
          </div>
          {video && (
            <>
              <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
                {video.title}
              </div>
              <div className="flex justify-between flex-col md:flex-row mt-4">
                <div className="flex">
                  <div className="flex items-start">
                    <div className="flex h-11 w-11 rounded-full overflow-hidden">
                      {video.author?.avatar &&
                        video.author.avatar.length > 0 && (
                          <img
                            className="h-full w-full object-cover"
                            src={video?.author?.avatar[0]?.url}
                            alt={video?.author?.title}
                          />
                        )}
                    </div>
                  </div>
                  <div className="flex flex-col ml-3">
                    <div className="text-white text-md font-semibold flex items-center">
                      {video?.author?.title}
                      {video?.author?.badges &&
                        video?.author?.badges[0]?.type ===
                          "VERIFIED_CHANNEL" && (
                          <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                        )}
                    </div>
                    <div className="text-white/[0.7] text-sm">
                      {video?.author?.stats?.subscribersText}
                    </div>
                  </div>
                </div>
                <div className="flex text-white mt-4 md:mt-0">
                  <LikeButton likes={video?.stats?.likes} />
                  <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4">
                    {`${abbreviateNumber(video?.stats?.views)} Views`}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
          {relatedVideos.map((item, index) => {
            if (item?.type !== "video") return null;
            return <SuggestionVideoCard key={index} video={item?.video} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
