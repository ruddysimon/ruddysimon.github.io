import { Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const VideoBackground = () => {
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Initialize video (always muted) and audio
  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;
    
    if (!video || !audio) return;

    // Video is always muted - we use separate audio file
    video.muted = true;

    // Try to play video
    const playVideo = video.play();
    if (playVideo !== undefined) {
      playVideo.catch((error) => {
        console.log('Video autoplay failed:', error);
      });
    }

    // For audio: start muted to allow autoplay, then unmute after a short delay
    audio.muted = true;
    audio.volume = 0.5; // Set volume to 50%
    
    const playAudio = audio.play();
    if (playAudio !== undefined) {
      playAudio
        .then(() => {
          // Audio started playing, now unmute it after a brief moment
          setTimeout(() => {
            if (audio) {
              audio.muted = false;
              setIsMuted(false);
            }
          }, 100);
        })
        .catch((error) => {
          console.log('Audio autoplay failed:', error);
          // Keep it muted if autoplay fails
          setIsMuted(true);
        });
    }
  }, []);

  // Update audio muted state when isMuted changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Handle user interaction to enable audio
  useEffect(() => {
    const enableAudio = async () => {
      const audio = audioRef.current;
      if (!audio) return;
      
      try {
        if (audio.paused) {
          await audio.play();
          console.log('Audio started playing');
        }
        // Unmute if it was muted
        if (audio.muted) {
          audio.muted = false;
          setIsMuted(false);
        }
      } catch (error) {
        console.log('Could not play audio:', error);
      }
    };

    // Try to enable audio on any user interaction
    const events = ['click', 'touchstart', 'keydown', 'scroll'];
    events.forEach(event => {
      document.addEventListener(event, enableAudio, { once: true, passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, enableAudio);
      });
    };
  }, []);

  const toggleMute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  return (
    <>
      <div className="fixed inset-0 w-full h-full overflow-hidden -z-10">
        {/* Video - always muted, no sound */}
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
        
        {/* Separate audio file for ocean waves */}
        <audio
          ref={audioRef}
          loop
          preload="auto"
          crossOrigin="anonymous"
        >
          <source src="/ocean-waves.mp3" type="audio/mpeg" />
          <source src="/ocean-waves.ogg" type="audio/ogg" />
          Your browser does not support the audio element.
        </audio>
        
        <div className="absolute inset-0 bg-background/30" />
      </div>
      
      <button
        onClick={toggleMute}
        type="button"
        className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-background/50 backdrop-blur-md border border-border hover:bg-background/70 transition-all duration-300 cursor-pointer"
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
    </>
  );
};

export default VideoBackground;
