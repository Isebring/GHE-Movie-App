import { useEffect } from "react";

interface Props {
  onLoadMore: () => void;
}

function useInfiniteScroll({ onLoadMore }: Props) {
  useEffect(() => {
    function handleIntersection(entries: IntersectionObserverEntry[]) {
      const target = entries[0];
      if (target.isIntersecting) {
        onLoadMore();
      }
    }

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0.1,
    });

    const sentinel = document.getElementById("sentinel");
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [onLoadMore]);
}

export default useInfiniteScroll;
