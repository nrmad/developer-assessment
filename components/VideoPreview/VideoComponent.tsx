// import { forwardRef, useEffect } from "react";


// interface PropTypes {
//     muted: boolean;
//     videoUrl: string;
//     handleOnVideoStart: () => void;
//     handleOnVideoEnd: () => void;
//     handleOnVideoSeek: () => void;
// }

// const VideoComponent = forwardRef<HTMLVideoElement, PropTypes>(function ChildComponent({ muted, videoUrl, handleOnVideoStart, handleOnVideoEnd, handleOnVideoSeek }, videoRef) {

//     useEffect(() => {

//         if (!videoRef.current) return

//         const videoElement = videoRef.current
//         videoElement.playbackRate = 1

//         const handleTimeUpdate = () => {
//             setCurrentTime((videoElement.currentTime / videoElement.duration) * 100)
//         }

//         // const handleMetaUpdate = () => {
//         //     setDuration(videoElement.duration)
//         // }

//         videoElement.addEventListener('timeupdate', handleTimeUpdate)
//         // videoElement.addEventListener('loadedmetadata', handleMetaUpdate)

//         return () => {
//             videoElement.removeEventListener('timeupdate', handleTimeUpdate)
//             // videoElement.removeEventListener('loadedmetadata', handleMetaUpdate)
//         }

//     }, [videoRef])

//     return (
//         <video
//             ref={videoRef}
//             className="aspect-video w-full"
//             muted={muted}
//             // preload="metadata"
//             // preload="auto"
//             controls={false}
//             onPlay={handleOnVideoStart}
//             onEnded={handleOnVideoEnd}
//             onSeeked={handleOnVideoSeek}
//         >
//             <source src={videoUrl} type="video/mp4" />
//             {/* Browser has no vid tag */}
//         </video>
//     );
// }
// )


// export default VideoComponent