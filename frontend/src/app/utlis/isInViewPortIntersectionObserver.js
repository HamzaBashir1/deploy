const checkInViewIntersectionObserver = ({
  target,
  options = { root: null, rootMargin: `0%`, threshold: 0 },
  callback,
  freezeOnceVisible = false,
}) => {
  const _funCallback = (entries, observer) => {
    entries.map((entry) => {
      if (entry.isIntersecting) {
        callback();
        // Unobserve the element if freezeOnceVisible is true
        if (freezeOnceVisible) {
          observer.unobserve(entry.target);
        }
      }
      return true;
    });
  };

  // Check for browser support
  if (typeof window.IntersectionObserver === "undefined") {
    console.error(
      "window.IntersectionObserver === undefined! => Your Browser does not support IntersectionObserver."
    );
    return;
  }

  const observer = new IntersectionObserver(_funCallback, options);
  if (target) observer.observe(target);
};

export default checkInViewIntersectionObserver;
