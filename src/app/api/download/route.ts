import { NextRequest } from "next/server";
import ytdl from "ytdl-core";
import fs from "fs";

interface RequestBody {
    url: string;
    format: string;
}

export default async function POST(req: NextRequest): Promise<void> {
    try {
        const { url, format }: RequestBody = await req.json();
        const info = await ytdl.getInfo(url);
        const title: string = info.videoDetails.title;
        if (format === "mp3") {
            ytdl(url, { filter: "audioonly" }).pipe(fs.createWriteStream(`${title}.mp3`));
        } else {
            ytdl(url, {
                filter: format === "mp4" ? "videoandaudio" : "videoonly"
            }).pipe(fs.createWriteStream(`${title}.mp4`));
        }
    } catch (error) {
        console.log(error);
    }
}