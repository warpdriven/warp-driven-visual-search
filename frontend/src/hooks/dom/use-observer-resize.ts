// React Imports
import React from "react";

export function useObserverResize<TRef extends Element>(
  elRef: React.RefObject<TRef>,
  options?: ResizeObserverOptions
) {
  // Prepare State
  const [entry, setEntry] = React.useState<ResizeObserverEntry | null>(null);

  // Bind Change
  React.useEffect(() => {
    const dom = elRef.current;
    const isElement = dom instanceof Element;
    if (!isElement) {
      console.error("Excepted an element, got falsy!");
      return;
    }

    const obverser = new ResizeObserver(([entry]) => {
      setEntry(entry);
    });
    obverser.observe(dom, options);

    // Clear Previos Effect
    return () => {
      obverser.disconnect();
      setEntry(null);
    };
  }, [elRef, setEntry, options]);

  return entry;
}
