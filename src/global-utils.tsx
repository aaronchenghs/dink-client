export enum ROUTES {
  HOME = "/",
  COURT_LOCATOR = "/map",
  COMMUNITY = "/community",
  SHOP = "/shop",
  EVENTS = "/events",
  LOGIN = "/login",
  PROFILE = "/profile",
  SETTINGS = "/settings",
  NOT_FOUND = "*",
}

export function darkenColor(color: string, percent: number): string {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

export const scrollToElement = (element: Element, duration: number) => {
  const startingY = window.pageYOffset;
  const elementY = window.pageYOffset + element.getBoundingClientRect().top;
  const diff = elementY - startingY;
  let start: number | undefined;

  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const percent = Math.min(time / duration, 1);
    const easedPercent = easeInOutCubic(percent);

    window.scrollTo(0, startingY + diff * easedPercent);

    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  });
};
