export interface iRootNavigationBarLinkProps {
  title: string;
  url: string;
  isActive: boolean;
}
export const RootNavigationBarLinks: iRootNavigationBarLinkProps[] = [
  {
    title: "Youtube Downloader",
    url: "/",
    isActive: true,
  },
  // {
  //   title: "Instagram Downloader",
  //   url: "/instagram-downloader",
  //   isActive: false,
  // },
];
