import { useRef, useEffect } from "react";

const BooksVideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Initialize video (muted, no audio)
  useEffect(() => {
    const video = videoRef.current;
    
    if (!video) return;

    // Video is always muted - no audio on books page
    video.muted = true;

    // Try to play video
    const playVideo = video.play();
    if (playVideo !== undefined) {
      playVideo.catch((error) => {
        console.log('Video autoplay failed:', error);
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10">
      {/* Video - muted, no sound */}
      <video
        ref={videoRef}
        autoPlay
        loop
        playsInline
        muted
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-background/60" />
    </div>
  );
};

export default BooksVideoBackground;

