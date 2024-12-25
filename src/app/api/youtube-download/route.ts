import { NextResponse } from "next/server";
import ytdl from "ytdl-core";
import fs from 'fs';

export async function GET(request: Request) {
    try {

        const { searchParams } = new URL(request.url);

        const url = searchParams.get('url');

        const format = searchParams.get('format');

        if (!url) {
            return NextResponse.json(
                { data: false, message: 'URL is required' },
                { status: 400 }
            );
        }

        if (!format) {
            return NextResponse.json(
                { data: false, message: 'Format is required' },
                { status: 400 }
            );
        }

        if (format !== "mp3" && format !== "mp4") {
            return NextResponse.json(
                { data: false, message: 'Invalid format' },
                { status: 400 }
            );
        }

        // validation the url 
        if (!ytdl.validateURL(url)) {
            return NextResponse.json(
                { data: false, message: 'Invalid URL' },
                { status: 400 }
            );
        }

        // Call the API to get video information
        const info = await ytdl.getBasicInfo(url);

        // Get the video title
        const title = info.videoDetails.title;

        if (format !== "mp3") {
            const res = ytdl(url, { filter: "video", quality: "highestaudio" })
                .pipe(fs.createWriteStream(`${title}.mp4`))
                .on('finish', () =>
                    NextResponse.json({
                        status: true,
                        message: "MP4 Downloaded Successfully",
                    })
                ).on('error', (err) => NextResponse.json({
                    status: false,
                    message: "Failed to download MP4",
                    error: err
                }));

            return NextResponse.json(res);

        } else {
            const res = ytdl(url, { filter: "video", quality: "highestaudio" })
                .pipe(fs.createWriteStream(`${title}.mp3`))
                .on('finish', () =>
                    NextResponse.json({
                        status: true,
                        message: "MP3 Downloaded Successfully",
                    }))
                .on('error', (err) => NextResponse.json({
                    status: false,
                    message: "Failed to download MP4",
                    error: err
                }));
            return NextResponse.json(res);

        }




    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { data: false, message: 'Invalid JSON or an error occurred' },
            { status: 400 }
        );
    }
}
