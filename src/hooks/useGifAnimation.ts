import { useEffect, useMemo, useRef, useState } from "react";
import {
  IMAGE_MOVE_FACTOR,
  INITIAL_IMAGE_POS_X,
  INITIAL_IMAGE_POS_Y,
  type GifDataProps,
} from "@/constants/constants";

type useGifAnimationReturnProps = {
  activeIndex: number;
  isAudioPlayerOn: boolean;
  onImgClickHandler: () => void;
  imgRef: React.RefObject<HTMLImageElement | null>;
  audioRef: React.RefObject<HTMLAudioElement | null>;
};

const useGifAnimation = (data: GifDataProps[]): useGifAnimationReturnProps => {
  const imgRef = useRef<HTMLImageElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const isAudioPlayerOn = useMemo(
    () => data.some((element) => element.audioSrc),
    []
  );

  const setNewActiveIndexHandler = () => {
    setActiveIndex((prev: number): number =>
      prev + 1 >= data.length ? 0 : prev + 1
    );
  };

  const onImgClickHandler = () => {
    if (audioRef.current!.paused) audioRef.current!.play();
    else audioRef.current!.pause();
  };

  const startImageAnimationHandler = (): number => {
    let startX = INITIAL_IMAGE_POS_X;
    let startY = INITIAL_IMAGE_POS_Y;
    let dX = 1 * IMAGE_MOVE_FACTOR;
    let dY = 1 * IMAGE_MOVE_FACTOR;

    let animationID = -1;

    const animateImage = () => {
      startX += dX;
      startY += dY;

      if (startX + imgRef.current!.width >= window.innerWidth || startX <= 0) {
        dX *= -1;
        startX = Math.max(
          0,
          Math.min(startX, window.innerWidth - imgRef.current!.width)
        );

        setNewActiveIndexHandler();
      }

      if (
        startY + imgRef.current!.height >= window.innerHeight ||
        startY <= 0
      ) {
        dY *= -1;
        startY = Math.max(
          0,
          Math.min(startY, window.innerHeight - imgRef.current!.height)
        );

        setNewActiveIndexHandler();
      }

      // update position
      imgRef.current!.style.transform = `translate(${startX}px, ${startY}px)`;

      animationID = requestAnimationFrame(animateImage);
    };

    animateImage();

    return animationID;
  };

  useEffect(() => {
    if (!imgRef.current) return;
    const animationID = startImageAnimationHandler();

    return () => {
      cancelAnimationFrame(animationID);
    };
  }, []);

  // useEffect(() => {
  //   if (!audioRef.current || !data[activeIndex].audioSrc) return

  //   audioRef.current.pause()
  //   audioRef.current.src = data[activeIndex].audioSrc
  //   audioRef.current.load()
  //   audioRef.current.play()

  // }, [activeIndex])

  return { imgRef, audioRef, isAudioPlayerOn, activeIndex, onImgClickHandler };
};

export default useGifAnimation;
