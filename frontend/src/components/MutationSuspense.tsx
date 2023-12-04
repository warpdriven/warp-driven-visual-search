// React Imports
import React from "react";
import ReactDOM from "react-dom";

export function MutationSuspense(props: MutationSuspenseProps) {
  // ** Props
  const { fallback, children, containerId } = props;

  const [container, setContainer] = React.useState<Element | null>(null);

  const childNode = React.useMemo(() => {
    if (!container) return null;

    return ReactDOM.createPortal(
      <React.Suspense fallback={fallback}>{children}</React.Suspense>,
      container
    );
  }, [container]);

  React.useEffect(() => {
    const checkEl = () => {
      setContainer(document.getElementById(containerId));
    };

    const observer = new MutationObserver(checkEl);
    observer.observe(document.body, { childList: true, subtree: true });

    checkEl();

    return () => {
      const records = observer.takeRecords();
      records.forEach(checkEl);

      observer.disconnect();
    };
  }, [setContainer]);

  return <>{childNode}</>;
}

export interface MutationSuspenseProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
  containerId: string;
}
