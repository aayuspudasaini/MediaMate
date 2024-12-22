"use server";

import { actionClient } from "@/lib/safe-action";
import { DownloaderSchema } from "../schema/downloader";

export const YoutubeDownloadHandler = actionClient.schema(DownloaderSchema).action(async ({ parsedInput }) => {
    try {
        const { url, format } = parsedInput;
        const response = await fetch("/api/download", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url, format }),
        });

        if (response.ok) {
            return { status: true, message: "Data downloaded successfully" };
        } else {
            return { status: false, error: "Failed to download data" };
        }
    } catch (error) {
        console.log(error)
        return { status: false, error: "Something went wrong. Please try again later." };
    }
})