import React from "react";

interface BackgroundVideoProps {
  src: string;
  className?: string;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  src,
  className,
}) => {
  return (
    <video autoPlay muted loop className={className}>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default BackgroundVideo;
