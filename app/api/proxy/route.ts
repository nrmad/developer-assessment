// app/api/proxy/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    const apiUrl = 'https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/videos.json';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            return NextResponse.error();
        }
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.error();
    }
}