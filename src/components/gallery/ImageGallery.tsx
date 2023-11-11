import { ImageItem } from "react-gallery-3d";
import DemoScene from "@/components/gallery/DemoScene";

const ImageGallery = () => {
  const images = Array.from(
    { length: 6 },
    (_, i) => `./images/img${i + 1}.jpg`,
  );

  return (
    <DemoScene>
      {images.map((image, index) => (
        <ImageItem key={index} src={image} />
      ))}
    </DemoScene>
  );
};

export default ImageGallery;
