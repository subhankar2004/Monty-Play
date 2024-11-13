import React, { useState } from 'react';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { abbreviateNumber } from "js-abbreviation-number";

const LikeButton = ({ likes }) => {
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    setLiked(!liked);
  };

  return (
    <button className="focus:outline-none flex items-center" onClick={handleClick}>
      {liked ? (
        <AiFillLike className="text-red-500 transform scale-125 transition-transform duration-300 mr-2" />
      ) : (
        <AiOutlineLike className="text-gray-500 transition-transform duration-300 mr-2" />
      )}
      {`${abbreviateNumber(likes, 2)} Likes`}
    </button>
  );
};

export default LikeButton;


