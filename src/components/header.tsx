import { homePath, ticketsPath } from "@/paths";
import { LucideKanban } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const Header = () => {
  return (
    <nav
      className="
            bg-background/60 border-b backdrop-blur
            fixed left-0 right-0 top-0 z-20
            w-full py-2.5 px-5
          "
    >
      <ul className="flex justify-between">
        <li>
          <Link
            href={homePath()}
            className={buttonVariants({ variant: "ghost" })}
          >
            <LucideKanban />
            <h1 className="text-lg font-semibold ml-2">TicketBounty</h1>
          </Link>
        </li>
        <li>
          <Link
            href={ticketsPath()}
            className={buttonVariants({ variant: "default" })}
          >
            Tickets
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export { Header };
