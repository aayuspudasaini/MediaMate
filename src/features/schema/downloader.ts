import { z } from "zod";

export type DownloaderFormProps = "mp3" | "mp4";

export const DownloaderSchema = z.object({
    url: z.string().url({
        message: "Invalid URL. Please enter a valid URL",
    }).min(1, "URL is required").refine((url) => {
        return url.includes("youtube.com") || url.includes("youtu.be");
    }, {
        message: "URL must be a YouTube video URL"
    }),
    format: z.enum(["mp3", "mp4"]),
});

export type DownloaderType = z.infer<typeof DownloaderSchema>;