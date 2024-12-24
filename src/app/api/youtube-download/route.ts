import { NextResponse } from "next/server";
import ytdl from "ytdl-core";

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

        // Call the API to download the video
        const info = await ytdl.getInfo(url);

        console.log(info);

        const fileName = `${info.videoDetails.title}.${format}`;

        if (format !== "mp3") {
            const response = ytdl(url, { filter: "videoandaudio", quality: "highestvideo" });
            return NextResponse.json({
                status: true,
                message: "Data fetched Successfully",
                data: {
                    fileName: fileName,
                    // response
                }
            })
        } else {
            const response = ytdl(url, { filter: "audioonly", quality: "highestaudio" });
            return NextResponse.json({
                status: true,
                message: "Data fetched Successfully",
                data: {
                    fileName: fileName,
                    // response
                }
            })
        }


    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { data: false, message: 'Invalid JSON or an error occurred' },
            { status: 400 }
        );
    }
}
