import { ImageItem } from "react-gallery-3d";
import DemoScene from "@/components/gallery/DemoScene";
import { useTexture } from "@react-three/drei";

const Renderer = () => {
  const images = Array.from(
    { length: 6 },
    (_, i) => `./images/img${i + 1}.jpg`,
  );

  const textures = useTexture(images);

  return (
    <>
      {textures.map((texture, index) => (
        <ImageItem key={index} texture={texture} />
      ))}
    </>
  );
};

const ImageGallery = () => {
  return (
    <DemoScene>
      <Renderer />
    </DemoScene>
  );
};

export default ImageGallery;
