// React Imports
import React from "react";

export function useObserverMutation<TRef extends Element>(
  ref: React.RefObject<TRef>,
  options?: MutationObserverInit
) {
  // Prepare State
  const [record, setRecord] = React.useState<MutationRecord | null>(null);

  // Observer Element Effect
  React.useEffect(() => {
    const el = ref.current;
    const isElement = el instanceof Element;
    if (!isElement) {
      console.error("Excepted an element, got falsy!");
      return;
    }

    const observer = new MutationObserver(([record]) => {
      setRecord(record);
    });
    observer.observe(el, options);

    // Clear Effect
    return () => {
      const records = observer.takeRecords();
      records.forEach((record) => {
        setRecord(record);
      });

      observer.disconnect();
      setRecord(null);
    };
  }, [ref, setRecord, options]);

  return record;
}
