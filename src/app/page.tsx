import { DownloaderForm } from "@/features/components/downloader-form";
import { FaYoutube } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { IoMusicalNotes } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";

export default function Home() {
  return (
    <section className="h-full w-full flex items-center justify-center flex-col">
      <div className=" max-w-4xl space-y-4 md:space-y-8 w-full px-8 md:px-0">
        <div className="relative w-full space-y-4 md:space-y-8 flex items-center flex-col">
          <BsStars className="size-12 text-primary absolute left-0 -top-12" />
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#ff0000]/15 absolute -right-10 -top-12">
            <FaYoutube className="size-6 text-[#FF0000]" />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-center leading-8">
            <span className="text-primary">MediaMate</span> - Download & Convert
            in Seconds
          </h1>
          <p className="text-lg md:text-xl text-center mt-4 font-medium text-muted-foreground max-w-2xl">
            Transform your YouTube experience with&nbsp;
            <span className="text-primary font-semibold">MediaMate</span> -
            Download videos and music in premium MP3/MP4 quality instantly.
            Fast, free, and simple to use, enjoy your favorite content offline
            anytime, anywhere. anywhere.
          </p>
          <div
            style={{
              clipPath: "polygon(0% 46%, 70% 0%, 66% 16%, 48% 20%, 32% 28%)",
            }}
          />

          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500  absolute left-6 bottom-4">
            <IoMusicalNotes className="size-6 text-white" />
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500  absolute right-6 bottom-4">
            <FaPlay className="size-4 text-white" />
          </div>
        </div>
        <DownloaderForm />
      </div>
    </section>
  );
}
