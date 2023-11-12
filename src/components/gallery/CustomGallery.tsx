import {
  SolidColorItem,
  VideoItem,
  GalleryItemMaterial,
  GalleryItem,
  VideoItemMaterial,
  GalleryItemInitData,
  ImageItemMaterial,
} from "react-gallery-3d";
import DemoScene from "@/components/gallery/DemoScene";
import { Material, MeshPhysicalMaterial, MeshStandardMaterial } from "three";
import SceneLights from "@/components/gallery/DemoScene/SceneLights";

class ShinySolidMaterial implements GalleryItemMaterial {
  private readonly color: string;
  private readonly opacity: number;

  constructor(color: string, opacity: number = 1) {
    this.color = color;
    this.opacity = opacity;
  }

  public generate() {
    return new MeshPhysicalMaterial({
      color: this.color,
      reflectivity: 1,
      metalness: 1,
      roughness: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
      transparent: true,
      opacity: this.opacity,
    });
  }
}

class GlassySolidMaterial extends ImageItemMaterial {
  constructor(src: string) {
    super(src);
  }

  public generate() {
    this.initTexture();

    return new MeshPhysicalMaterial({
      toneMapped: false,
      map: this.texture,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
      metalness: 0,
      roughness: 0,
      transmission: 0.2,
      clearcoat: 0.3,
    });
  }
}

class ShinyVideoMaterial extends VideoItemMaterial {
  constructor(source: string) {
    super(source);
  }

  generate(): Material | Material[] {
    this.initVideo();

    return new MeshPhysicalMaterial({
      toneMapped: true,
      map: this.texture,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
      reflectivity: 1,
      metalness: 1,
      roughness: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });
  }
}

const CustomGallery = () => {
  const makeWireframe = (material: MeshStandardMaterial) => {
    material.wireframe = true;
    material.needsUpdate = true;
  };

  const makeTransparent = (
    material: MeshStandardMaterial,
    opacity: number = 0.5,
  ) => {
    material.transparent = true;
    material.opacity = opacity;
    material.needsUpdate = true;
  };

  const makeShiny = (material: MeshStandardMaterial) => {
    material.wireframe = true;
    material.needsUpdate = true;
  };

  const autoPlayOnInit = ({ itemMaterial }: GalleryItemInitData) => {
    if (itemMaterial instanceof VideoItemMaterial) {
      itemMaterial.getVideo()?.play();
    }
  };

  return (
    <DemoScene sceneElements={<SceneLights />}>
      <SolidColorItem
        color="red"
        onInit={({ material }) =>
          makeWireframe(material as MeshStandardMaterial)
        }
      />
      <VideoItem
        src="./videos/vid3.mp4"
        onInit={({ material }) =>
          makeTransparent(material as MeshStandardMaterial)
        }
      />
      <GalleryItem itemMaterial={new ShinySolidMaterial("green")}></GalleryItem>
      <GalleryItem
        itemMaterial={new GlassySolidMaterial("./images/img4.jpg")}
      ></GalleryItem>
      <GalleryItem
        itemMaterial={new ShinyVideoMaterial("./videos/vid6.mp4")}
        onInit={autoPlayOnInit}
      ></GalleryItem>
    </DemoScene>
  );
};

export default CustomGallery;
