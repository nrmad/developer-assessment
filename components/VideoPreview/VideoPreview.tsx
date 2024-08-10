'use client'

import { useCallback, useEffect, useRef } from "react";
import Image from 'next/image'
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "../ui/button";
import { useImmer } from "use-immer";
import { Slider } from "../ui/slider";
import { VideoData } from "@/types/components/video-preview";


// interface VideoData {
//     id: string;
//     title: string;
//     thumbnailUrl: string;
//     duration: string;
//     uploadTime: string;
//     views: string;
//     author: string;
//     videoUrl: string;
//     description: string;
//     subscriber: string;
//     isLive: boolean;
// }

interface InteractiveProps {
    mode: 'interactive';
    onVideoStart?: () => void;
    onVideoEnd?: () => void;
    onVideoResume?: () => void;
    onVideoSeek?: () => void;
}

interface StaticProps {
    mode: 'static';
}

// type GenericVideoData<T> = T


type PropTypes<T extends VideoData> = {
    videoData: T;
} & (InteractiveProps | StaticProps)

export default function VideoPreview<T extends VideoData>(props: PropTypes<T>) {

    const { videoData: { id, videoUrl, thumbnailUrl, title, author, views, uploadTime } } = props


    // duration ^

    const videoRef = useRef<HTMLVideoElement>(null)
    const timeoutRef = useRef<number | null>(null)
    // const visitedRef = useRef<boolean>(false)

    const [visited, setVisited] = useImmer<boolean>(false)
    const [manual, setManual] = useImmer<boolean>(false)
    const [active, setActive] = useImmer<boolean>(false)
    const [muted, setMuted] = useImmer<boolean>(true)
    const [currentTime, setCurrentTime] = useImmer<number>(0)
    // const [duration, setDuration] = useImmer<number>(0)

    // TODO: add progress bar animate in with framer-motion
    // TODO: fetch function generic
    // TODO: ERROR sometimes your mouse moves fast enough that mouse leave not detected
    // TODO: TESTING
    // TODO: ERROR HANDLING FUNCTION


    useEffect(() => {

        if (!videoRef.current) return

        const videoElement = videoRef.current
        videoElement.playbackRate = 1

        const handleTimeUpdate = () => {
            setCurrentTime((videoElement.currentTime / videoElement.duration) * 100)
        }

        // const handleMetaUpdate = () => {
        //     setDuration(videoElement.duration)
        // }

        videoElement.addEventListener('timeupdate', handleTimeUpdate)
        // videoElement.addEventListener('loadedmetadata', handleMetaUpdate)

        handlePlay()

        return () => {
            videoElement.removeEventListener('timeupdate', handleTimeUpdate)
            // videoElement.removeEventListener('loadedmetadata', handleMetaUpdate)
        }

    }, [visited])

    const handleOnVideoStart = () => {
        if (!(props.mode === 'interactive')) return
        if (manual && props.onVideoResume) props.onVideoResume()
        else if (!manual && props.onVideoStart) props.onVideoStart()
    }

    const handleOnVideoEnd = () => {
        if (props.mode === 'interactive' && props.onVideoEnd) props.onVideoEnd()
    }

    const handleOnVideoSeek = () => {
        if (props.mode === 'interactive' && props.onVideoSeek) props.onVideoSeek()
    }


    // const timeUpdate = ([time]: number[]) => {
    //     setCurrentTime(time)
    // }

    const handlePlay = useCallback(() => {

        timeoutRef.current = window.setTimeout(() => {
            if (!videoRef.current) return
            setActive(true)
            videoRef.current.play()
        }, 500)
        // console.log("start " + timeoutRef.current)

    }, [])

    const handlePause = useCallback(() => {
        // console.log("stop " + timeoutRef.current)

        if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current)
        timeoutRef.current = null
        if (!videoRef.current) return
        setActive(false)
        if (manual) videoRef.current.pause()
        else {
            videoRef.current.currentTime = 0
            videoRef.current.pause();
            setCurrentTime(0)
        }
    }, [manual])


    const handleSeek = ([time]: number[]) => {
        if (!videoRef.current) return
        videoRef.current.currentTime = (videoRef.current.duration / 100) * time
        setCurrentTime(time)
        setManual(true)
    }

    const handleVisited = () => {
        if (visited) handlePlay()
        else setVisited(true)
    }

    // this needs delay too
    // const onEndReset = () => {
    //     if (!videoRef.current) return
    //     videoRef.current.currentTime = 0
    //     setCurrentTime(0)
    // }

    //onEnded={onEndReset}

    const formatTime = (): string => {
        if (!videoRef.current) return ""
        const time = videoRef.current.currentTime
        const seconds = Math.floor(time % 60)
        const minutes = Math.floor(time / 60)
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }




    // function isInteractiveProps(predProps: PropTypes): predProps is InteractiveProps & { videoData: VideoData } {
    //     return props.mode === 'interactive';
    // }

    // const callbacks = isInteractiveProps(props) ? props : {};


    //poster={thumbnailUrl}
    return (
        <div className="flex flex-col space-y-4 w-full max-w-96 cursor-pointer p-2 rounded-lg hover:bg-black/5" onMouseEnter={handleVisited} onMouseLeave={handlePause}>
            <div className="relative aspect-video max-w-96  rounded-lg overflow-hidden ">
                {
                    (props.mode === 'interactive' && visited) &&
                    <video
                        ref={videoRef}
                        className="aspect-video w-full"
                        muted={muted}
                        // preload="metadata"
                        preload="auto"
                        controls={false}
                        onPlay={handleOnVideoStart}
                        onEnded={handleOnVideoEnd}
                        onSeeked={handleOnVideoSeek}
                    >
                        <source src={videoUrl} type="video/mp4" />
                        {/* Browser has no vid tag */}
                    </video>
                }
                {
                    active ?
                        <>
                            <div className="absolute right-0 top-0 botton-0 p-2 ">
                                <Button size="icon" variant="ghost" className="rounded-full hover:bg-black/70 bg-black/70 " onClick={() => setMuted(!muted)}>
                                    {muted ? <VolumeX className="w-5 h-5 stroke-white" /> : <Volume2 className="w-5 h-5 stroke-white" />}
                                </Button>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-2 ">
                                <Slider max={100} value={[currentTime]} onValueChange={handleSeek} className={` w-full h-2`} />
                            </div>
                            <div className="absolute right-0 bottom-5 ">
                                <div className="bg-black/70 p-1 mr-2 rounded-sm">
                                    <p className="text-white text-xs">{formatTime()}</p>
                                </div>
                            </div>
                        </>
                        : <div className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${thumbnailUrl})`,
                            }}
                        />
                }

            </div>
            <div className="w-full max-w-full flex space-x-4 h-24">
                <div className="flex flex-col">
                    <div className="h-9 w-9 rounded-full border border-solid border-black" />

                </div>
                <div className="w-full flex flex-col max-w-full  overflow-hidden space-y-2 ">
                    <p className=" font-semibold text-base leading-5 line-clamp-2">{title}</p>
                    <div className="flex flex-col w-full max-w-full">
                        <p className="text-sm text-muted-foreground line-clamp-1">{author}</p>
                        <div className="flex w-full space-x-2">
                            <p className="text-sm">{views}</p>
                            <p className="text-sm">{uploadTime}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
