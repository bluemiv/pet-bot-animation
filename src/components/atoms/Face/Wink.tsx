import React, { useEffect, useRef, useState } from "react";
import eyesImage0 from "../../../resources/wink/eyes0.svg";
import eyesImage1 from "../../../resources/wink/eyes1.svg";
import eyesImage2 from "../../../resources/wink/eyes2.svg";
import eyesImage3 from "../../../resources/wink/eyes3.svg";
import eyesImage4 from "../../../resources/wink/eyes4.svg";

const IMAGES = [eyesImage0, eyesImage1, eyesImage2, eyesImage3, eyesImage4];

const interval = 1500;

interface TWinkProps {}

const Wink = ({}: TWinkProps) => {
  const [image, setImage] = useState<string>(IMAGES[0]);
  const imageIdx = useRef<number>(0);
  const prevTimer = useRef<number>(0);
  const intervalStart = useRef<number>(0);

  useEffect(() => {
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  const animate: FrameRequestCallback = (timestamp) => {
    const delta = timestamp - prevTimer.current;
    if (prevTimer.current === 0 || delta > 25) {
      prevTimer.current = timestamp;
      imageIdx.current = imageIdx.current + 1;
      if (imageIdx.current > IMAGES.length - 1) {
        if (intervalStart.current === 0) {
          intervalStart.current = timestamp;
        }
        if (timestamp - intervalStart.current > interval) {
          intervalStart.current = 0;
          imageIdx.current = 0;
          setImage(IMAGES[imageIdx.current]);
        }
      } else {
        setImage(IMAGES[imageIdx.current]);
      }
    }
    requestAnimationFrame(animate);
  };

  return (
    <div className="flex justify-between">
      <div className="w-[500px] h-[300px] flex flex-col justify-center items-center">
        <img src={eyesImage0} />
      </div>
      <div className="w-[500px] h-[300px] flex flex-col justify-center items-center">
        <img src={image} />
      </div>
    </div>
  );
};

export default Wink;
