import Link from "next/link";
import { IoMusicalNotes } from "react-icons/io5";
import { BsStars } from "react-icons/bs";

export const AppLogo = () => {
  return (
    <Link
      href="/"
      className="relative text-lg md:text-xl font-extrabold flex items-center gap-x-0.5 mr-auto"
    >
      <IoMusicalNotes className="size-6 text-primary" />
      MediaMate
      <BsStars className="size-6 text-yellow-400 absolute -right-3.5 -top-2" />
    </Link>
  );
};
