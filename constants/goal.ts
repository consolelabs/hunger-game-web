type Goal = {
  src: string;
  css: string;
};

export const GOALS: Record<string, Goal> = {
  a: {
    src: "/assets/spritesheets/portals/portal-red.webp",
    css: "hue-rotate-120", // green
  },
  b: {
    src: "/assets/spritesheets/portals/portal-red.webp",
    css: "hue-rotate-240", // purple
  },
  c: {
    src: "/assets/spritesheets/portals/portal-red.webp",
    css: "",
  },
  d: {
    src: "/assets/spritesheets/portals/portal-yellow.webp",
    css: "",
  },
};
