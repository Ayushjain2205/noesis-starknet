import { useRouter } from "next/router";
import Link from "next/link";
import { ConnectButton, lightTheme } from "thirdweb/react";
import { client } from "../utils/client";

export default function Layout({ children }) {
  const customTheme = lightTheme({
    colors: {
      primaryButtonBg: "#9381FF",
    },
  });

  const router = useRouter(); // Use the useRouter hook to get the current path

  // A small function to determine if a link is active based on the current route
  const isActive = (href) => router.pathname === href;

  return (
    <>
      <div className="navbar flex items-center justify-between bg-base-100 px-[20px]">
        <div className="flex flex-row gap-[16px]">
          <img className="h-[36px] w-[36px]" src="/icons/logo.svg" alt="" />
          <span className="text-primary font-bold text-[36px]">Noesis</span>
        </div>
        <div className="flex flex-row gap-[40px]">
          {/* Apply styles conditionally based on the active state */}
          <Link href="/">
            <span
              className={`font-[500] text-[18px] ${
                isActive("/") ? "text-primary" : "text-grey"
              }`}
            >
              Datasets
            </span>
          </Link>
          <Link href="/label">
            <span
              className={`font-[500] text-[18px] ${
                isActive("/label") ? "text-primary" : "text-grey"
              }`}
            >
              Label
            </span>
          </Link>
          <Link href="/create">
            <span
              className={`font-[500] text-[18px] ${
                isActive("/create") ? "text-primary" : "text-grey"
              }`}
            >
              Create
            </span>
          </Link>
        </div>
        <div className="flex flex-row gap-[100px]">
          <div className="flex flex-row gap-[10px] items-center">
            <img className="h-[36px] w-[36px]" src="/icons/coin.svg" alt="" />
            <span className="font-bold text-[22px]">
              {new Intl.NumberFormat("en-US").format(3400)}
            </span>
          </div>
          <div>
            <ConnectButton theme={customTheme} client={client} />
          </div>
        </div>
      </div>
      <div className="grow px-[40px] py-[20px]">{children}</div>
    </>
  );
}
