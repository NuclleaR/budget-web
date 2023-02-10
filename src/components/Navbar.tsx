import { t } from "@/utils/translation";
import { FC, useLayoutEffect, useRef } from "react";
import { FontAwesome } from "./FontAwesomeIcons";
import { Solid } from "./icon";

type NavbarProps = {
  trailing?: React.ReactNode;
  title: string;
  hasBack?: boolean;
};

export const Navbar: FC<NavbarProps> = ({ trailing, title, hasBack }) => {
  const backRef = useRef<HTMLButtonElement | null>(null);
  const titleRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    if (backRef.current && titleRef.current) {
      const backRect = backRef.current.getBoundingClientRect();
      const titleRect = titleRef.current.getBoundingClientRect();
      if (backRect.right > titleRect.left) {
        titleRef.current.style.transform = `translateX(${backRect.width / 2 + 4}px)`;
        titleRef.current.style.maxWidth = `calc(100% - ${backRect.width + 4}px)`;
      }
    }
  }, []);

  return (
    <div className="relative flex h-toolbar items-center justify-center bg-slate-200 bg-opacity-70 px-4 py-3 shadow backdrop-blur-md dark:bg-zinc-800">
      {hasBack && (
        <button
          className="absolute left-4 top-4 h-6"
          type="button"
          ref={backRef}
          onClick={() => {
            history.back();
          }}
        >
          <Solid name={FontAwesome.chevronLeft} className="mr-1.5" />
          {t("back")}
        </button>
      )}
      <span ref={titleRef} className="truncate text-xl font-semibold">
        {title}
      </span>
      {trailing}
    </div>
  );
};
