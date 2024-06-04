import {
  GalleryItem,
  ImageItemProps,
  SolidColorItemProps,
  TransparentItem,
  useImageMaterial,
  useVideoMaterial,
  VideoItemProps,
} from "react-gallery-3d";
import DemoScene from "@/components/gallery/DemoScene";
import { MeshPhysicalMaterial } from "three";
import SceneLights from "@/components/gallery/DemoScene/SceneLights";
import { useEffect, useMemo } from "react";
import PlaceOnItem from "@/components/utils/PlaceOnItem";
import Model from "@/components/utils/Model";

const ShinySolidColorItem = ({
  color,
  opacity = 1,
  ...rest
}: SolidColorItemProps & {
  opacity?: number;
}) => {
  const material = useMemo(
    () =>
      new MeshPhysicalMaterial({
        reflectivity: 0.8,
        metalness: 0.7,
        roughness: 0.1,
        clearcoat: 0.1,
        clearcoatRoughness: 0.1,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
        transparent: true,
      }),
    [],
  );

  useEffect(() => {
    material.color.set(color);
    material.opacity = opacity;
  }, [color, material, opacity]);

  return <GalleryItem material={material} {...rest} />;
};

const GlassImageItem = ({ src, texture, ...rest }: ImageItemProps) => {
  const wrappedMaterial = useMemo(
    () =>
      new MeshPhysicalMaterial({
        toneMapped: false,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
        metalness: 0,
        roughness: 0,
        clearcoat: 0.1,
      }),
    [],
  );

  const { material } = useImageMaterial({
    src,
    texture,
    wrappedMaterial,
  });

  return <GalleryItem material={material} {...rest} />;
};

const ShinyVideoItem = ({ src, ...rest }: VideoItemProps) => {
  const wrappedMaterial = useMemo(
    () =>
      new MeshPhysicalMaterial({
        toneMapped: true,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
        reflectivity: 0.1,
        metalness: 1,
        roughness: 0.2,
        clearcoat: 0.2,
        clearcoatRoughness: 0.1,
      }),
    [],
  );

  const { material } = useVideoMaterial({
    src,
    wrappedMaterial,
  });

  return <GalleryItem material={material} {...rest} />;
};

const CustomGallery = () => {
  return (
    <DemoScene sceneElements={<SceneLights />}>
      <TransparentItem>
        <PlaceOnItem offset={40} isOnGround>
          <Model url="./models/belly-dancer.glb" />
        </PlaceOnItem>
      </TransparentItem>

      <ShinySolidColorItem color="red"></ShinySolidColorItem>

      <GlassImageItem src={"./images/img2.jpg"} />

      <ShinyVideoItem src={"./videos/vid4.mp4"} />

      <ShinySolidColorItem color="green" opacity={0.5} />
    </DemoScene>
  );
};

export default CustomGallery;
