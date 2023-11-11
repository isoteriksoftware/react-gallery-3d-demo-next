import dynamic from "next/dynamic";

const DemoScene = dynamic(
  () =>
    import("@/components/gallery/DemoScene/DemoScene").then(
      (mod) => mod.DemoScene,
    ),
  {
    ssr: false,
  },
);

export default DemoScene;
