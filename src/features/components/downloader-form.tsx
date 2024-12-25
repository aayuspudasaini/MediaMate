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
import axios from "axios";
import { DownloadCloud, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const DownloaderForm = () => {
  const [execute, setExecuting] = React.useState<boolean>(false);
  const [link, setLink] = React.useState<string>("");
  const form = useForm({
    mode: "onChange",
    defaultValues: {
      format: "mp3" as DownloaderType["format"],
      url: "",
    },
    resolver: zodResolver(DownloaderSchema),
  });

  const onSubmit = async (values: DownloaderType) => {
    try {
      setExecuting(true);
      const res = await axios.get(
        `/api/youtube-download?url=${values.url}&format=${values.format}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.error(error);
    } finally {
      setExecuting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className="w-full flex flex-col items-center justify-center gap-y-4 "
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="relative flex flex-row items-center w-full">
          <div className="absolute left-1 flex items-center z-10">
            <FormField
              control={form.control}
              name="format"
              render={({ field }) => (
                <Select
                  defaultValue={"mp3"}
                  onValueChange={field.onChange}
                  value={field.value}
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
                        "w-full rounded-full h-12 pl-[6rem] pr-[7rem] truncate",
                        {
                          "border-red-600": form.formState.errors.url,
                        }
                      )}
                      required
                    />
                  </FormControl>
                  <Button
                    className="absolute rounded-full right-1 top-1"
                    type="submit"
                  >
                    {execute ? (
                      <div className="flex items-center">
                        <Loader2 className="size-4 animate-spin mr-1" />
                        Please Wait
                      </div>
                    ) : (
                      "Convert"
                    )}
                  </Button>
                </div>
                <FormMessage className="text-red-600 text-sm dark:text-red-500 absolute" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row items-center justify-center gap-x-2.5">
          <Button
            className="rounded-full"
            variant="default"
            type="button"
            onClick={() => form.reset()}
          >
            <DownloadCloud className="size-4 mr-1" />
            Download
          </Button>
          <Button
            className="rounded-full"
            variant="ghost"
            type="button"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
};
