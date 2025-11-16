import useGifAnimation from "@/hooks/useGifAnimation";

import { type GifAnimationProps } from "./GifAnimationProps";

const GifAnimation = ({ data }: GifAnimationProps) => {
  const { imgRef, audioRef, activeIndex, onImgClickHandler, isAudioPlayerOn } = useGifAnimation(data);

  return (
    <div className="absolute top-0 left-0 will-change-transform">
      <img
        width={150}
        height={150}
        ref={imgRef}
        onClick={onImgClickHandler}
        src={data[activeIndex].imgSrc}
      />
      {isAudioPlayerOn && <audio ref={audioRef} autoPlay />}
    </div>
  );
};

export default GifAnimation;
