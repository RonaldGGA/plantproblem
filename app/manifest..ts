import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PlantProblem",
    short_name: "PlantProblem",
    description: "Practical houseplant care & troubleshooting guides.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F6F2",
    theme_color: "#2D5A3D",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
