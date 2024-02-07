import { useEffect, useRef, useState } from "react";

function useElementHeight() {
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    setHeight(ref.current.offsetHeight);
  }, []);

  return { ref, height };
}

export default useElementHeight;
