import { VideoData } from '@/types/components/video-preview';
import { useQuery } from 'react-query';

const fetchVideoData = async (url: string): Promise<VideoData[]> => {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
        }
     });

    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    return response.json();
};

export const useVideoData = (videoUrl: string) => {
    return useQuery<VideoData[], Error>(
        ['videoData', videoUrl],
        () => fetchVideoData(videoUrl),
        {
            enabled: !!videoUrl,
            retry: 1,
            staleTime: 60000,
        }
    );
};