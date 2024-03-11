import { Box } from "@mui/material";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import React from "react";
import type { BoxProps } from "@mui/material";

export function Scrollbar(props: Props) {
  const {
    children,
    options,
    onPsScrollX,
    onPsScrollY,
    onPsScrollUp,
    onPsScrollDown,
    onPsScrollLeft,
    onPsScrollRight,
    onPsXReachStart,
    onPsXReachEnd,
    onPsYReachStart,
    onPsYReachEnd,
    ...restProps
  } = props;

  const containerRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const psRef = React.useRef<PerfectScrollbar | null>(null);

  React.useEffect(() => {
    const containerEl = containerRef.current;

    if (!(containerEl instanceof HTMLElement)) {
      return;
    }

    const contentEl = contentRef.current;

    if (!(contentEl instanceof HTMLElement)) {
      return;
    }

    const observer = new ResizeObserver(() => {
      if (contentEl.clientHeight > containerEl.clientHeight) {
        psRef.current
          ? psRef.current.update()
          : (() => {
              psRef.current = new PerfectScrollbar(containerEl, options);
            })();

        return;
      }

      psRef.current?.destroy();
      psRef.current = null;
    });

    observer.observe(containerEl);
    observer.observe(contentEl);

    return () => {
      psRef.current?.destroy();
      psRef.current = null;
      observer.disconnect();
    };
  }, [options]);

  React.useEffect(() => {
    const containerEl = containerRef.current;

    if (!(containerEl instanceof HTMLElement)) {
      return;
    }

    const map = new Map<string, (evt: Event) => void>();

    if (typeof onPsScrollX === "function") {
      map.set("ps-scroll-x", onPsScrollX);
    }

    if (typeof onPsScrollY === "function") {
      map.set("ps-scroll-y", onPsScrollY);
    }

    if (typeof onPsScrollUp === "function") {
      map.set("ps-scroll-up", onPsScrollUp);
    }

    if (typeof onPsScrollDown === "function") {
      map.set("ps-scroll-down", onPsScrollDown);
    }

    if (typeof onPsScrollLeft === "function") {
      map.set("ps-scroll-left", onPsScrollLeft);
    }

    if (typeof onPsScrollRight === "function") {
      map.set("ps-scroll-right", onPsScrollRight);
    }

    if (typeof onPsXReachStart === "function") {
      map.set("ps-x-reach-start", onPsXReachStart);
    }

    if (typeof onPsXReachEnd === "function") {
      map.set("ps-x-reach-end", onPsXReachEnd);
    }

    if (typeof onPsYReachStart === "function") {
      map.set("ps-y-reach-start", onPsYReachStart);
    }

    if (typeof onPsYReachEnd === "function") {
      map.set("ps-y-reach-end", onPsYReachEnd);
    }

    const controller = new AbortController();

    map.forEach((handler, name) => {
      containerEl.addEventListener(name, handler, {
        signal: controller.signal,
      });
    });

    return () => {
      controller.abort();
    };
  }, [
    onPsScrollX,
    onPsScrollY,
    onPsScrollUp,
    onPsScrollDown,
    onPsScrollLeft,
    onPsScrollRight,
    onPsXReachStart,
    onPsXReachEnd,
    onPsYReachStart,
    onPsYReachEnd,
  ]);

  return (
    <Box
      ref={containerRef}
      position={"relative"}
      height={"100%"}
      {...restProps}
    >
      <Box ref={contentRef}>{children}</Box>
    </Box>
  );
}

type Props = BoxProps &
  Partial<{
    options: PerfectScrollbar.Options;
    onPsScrollX(evt: Event): void;
    onPsScrollY(evt: Event): void;
    onPsScrollUp(evt: Event): void;
    onPsScrollDown(evt: Event): void;
    onPsScrollLeft(evt: Event): void;
    onPsScrollRight(evt: Event): void;
    onPsXReachStart(evt: Event): void;
    onPsXReachEnd(evt: Event): void;
    onPsYReachStart(evt: Event): void;
    onPsYReachEnd(evt: Event): void;
  }>;
