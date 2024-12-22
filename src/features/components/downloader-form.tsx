"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { DownloaderSchema, DownloaderType } from "../schema/downloader";
import { useForm } from "react-hook-form";
import React from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useAction } from "next-safe-action/hooks";
import { YoutubeDownloadHandler } from "../server-action/youtube-download-handler";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const DownloaderForm = () => {
  const form = useForm({
    mode: "onChange",
    defaultValues: {
      format: "mp3" as DownloaderType["format"],
      url: "",
    },
    resolver: zodResolver(DownloaderSchema),
  });

  const { execute, isExecuting } = useAction(YoutubeDownloadHandler, {
    onSuccess: ({ data }) => {
      if (!data?.status) {
        toast.error(data?.error);
      } else {
        toast.success("");
        form.reset();
      }
    },
  });

  return (
    <Form {...form}>
      <form
        className="w-full flex flex-row items-center justify-center gap-x-2.5 relative"
        onSubmit={form.handleSubmit(execute)}
      >
        <div className="absolute left-1 flex items-center z-10">
          <FormField
            control={form.control}
            name="format"
            render={({ field }) => (
              <Select
                defaultValue={"mp3"}
                onValueChange={field.onChange}
                value={field.value}
                disabled={isExecuting}
              >
                <SelectTrigger className="w-20 font-medium text-sm  border-none bg-transparent rounded-full focus:bg-transparent">
                  <SelectValue placeholder="MP3" />
                </SelectTrigger>
                <SelectContent className="mt-2.5">
                  <SelectGroup>
                    <SelectItem className="cursor-pointer" value="mp3">
                      MP3
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="mp4">
                      MP4
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <Separator className="w-[1px] h-6" />
        </div>

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="w-full">
              <div className="flex items-center justify-center relative">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter URL"
                    className={cn(
                      "w-full rounded-full h-12 pl-[6rem] pr-12 truncate",
                      {
                        "border-red-600": form.formState.errors.url,
                      }
                    )}
                    required
                    disabled={isExecuting}
                  />
                </FormControl>
                <Button
                  className="absolute rounded-full right-1 top-1"
                  type="submit"
                  disabled={isExecuting}
                >
                  {isExecuting ? (
                    <div className="flex items-center">
                      <Loader2 className="size-4 animate-spin mr-1" />
                      Please Wait
                    </div>
                  ) : (
                    "Download"
                  )}
                </Button>
              </div>
              <FormMessage className="text-red-600 text-sm dark:text-red-500 absolute" />
            </FormItem>
          )}
        />
        <Button
          className="rounded-full"
          variant="ghost"
          type="button"
          onClick={() => form.reset()}
          disabled={isExecuting}
        >
          Reset
        </Button>
      </form>
    </Form>
  );
};
