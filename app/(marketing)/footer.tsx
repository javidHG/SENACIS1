import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2  border-slate-200 p-2">
      <div className="max-w-screen-lg- mx-auto flex items-center justify-evenly h-full">
        <Button size={"lg"} variant={"ghost"} className="-w-full">
          <Image
            src={"/Java.png"}
            alt="Java"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Java Basico
        </Button>

        <Button size={"lg"} variant={"ghost"} className="-w-full">
          <Image
            src={"/JavaScriptBandera.png"}
            alt="JavaScript"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          JavaScript Basico
        </Button>

        <Button size={"lg"} variant={"ghost"} className="-w-full">
          <Image
            src={"/HTMLBandera.png"}
            alt="HTML"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          HTML
        </Button>

        <Button size={"lg"} variant={"ghost"} className="-w-full">
          <Image
            src={"/CssBandera.png"}
            alt="CSS"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          CSS
        </Button>
      </div>
    </footer>
  );
};
