import React, { useEffect, useRef, useState } from "react";
import type { TFaceProps } from "../../../types";
import eyesImage0 from "../../../resources/smile/eyes0.svg";
import eyesImage1 from "../../../resources/smile/eyes1.svg";
import eyesImage2 from "../../../resources/smile/eyes2.svg";
import eyesImage3 from "../../../resources/smile/eyes3.svg";
import eyesImage4 from "../../../resources/smile/eyes4.svg";
import eyesImage5 from "../../../resources/smile/eyes5.svg";
import eyesImage6 from "../../../resources/smile/eyes6.svg";
import eyesImage7 from "../../../resources/smile/eyes7.svg";
import eyesImage8 from "../../../resources/smile/eyes8.svg";
import eyesImage9 from "../../../resources/smile/eyes9.svg";
import eyesImage10 from "../../../resources/smile/eyes10.svg";
import eyesImage11 from "../../../resources/smile/eyes11.svg";

const imageSequence = [
  { image: eyesImage0 },
  { image: eyesImage1 },
  { image: eyesImage2 },
  { image: eyesImage3 },
  { image: eyesImage4 },
  { image: eyesImage5 },
  { image: eyesImage6 },
  { image: eyesImage7 },
  { image: eyesImage8, time: 1000 },
  { image: eyesImage9 },
  { image: eyesImage10 },
  { image: eyesImage11 },
];

interface TSmileProps extends TFaceProps {}

const Smile = ({ interval = 2000 }: TSmileProps) => {
  const [image, setImage] = useState<string>(imageSequence[0].image);
  const imageIdx = useRef<number>(0);
  const prevTimer = useRef<number>(0);
  const intervalStart = useRef<number>(0);

  useEffect(() => {
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  const animate: FrameRequestCallback = (timestamp) => {
    const delta = timestamp - prevTimer.current;
    if (
      prevTimer.current === 0 ||
      delta > (imageSequence?.[imageIdx.current]?.time ?? 15)
    ) {
      prevTimer.current = timestamp;
      imageIdx.current = imageIdx.current + 1;
      if (imageIdx.current > imageSequence.length - 1) {
        if (intervalStart.current === 0) {
          intervalStart.current = timestamp;
        }
        if (timestamp - intervalStart.current > interval) {
          intervalStart.current = 0;
          imageIdx.current = 0;
          setImage(imageSequence[imageIdx.current].image);
        }
      } else {
        setImage(imageSequence[imageIdx.current].image);
      }
    }
    requestAnimationFrame(animate);
  };

  return (
    <div className="flex justify-between px-40 pt-20">
      <div className="flex flex-col justify-end items-center">
        <img src={image} />
      </div>
      <div className="flex flex-col justify-end items-center">
        <img src={image} />
      </div>
    </div>
  );
};

export default Smile;