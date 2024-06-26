import React, { useEffect } from "react";
import { Gallery, GalleryChildren, GalleryScene } from "react-gallery-3d";
import { Stats } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "three";
import { useGallerySceneSettings } from "@/common/hooks";
import { EnvironmentPresets } from "@/components/gallery/types";
import SceneLights from "@/components/gallery/DemoScene/SceneLights";

const CameraUpdate: React.FC<{
  cameraControls: { fov: number; position: [number, number, number] };
}> = ({ cameraControls }) => {
  const { camera } = useThree();

  useEffect(() => {
    if (camera instanceof PerspectiveCamera) {
      camera.fov = cameraControls.fov;
      camera.position.set(...cameraControls.position);
      camera.updateProjectionMatrix();
    }
  }, [camera, cameraControls]);

  return null;
};

const DemoScene: React.FC<{
  children: GalleryChildren;
  sceneElements?: React.ReactNode;
}> = ({ children, sceneElements }) => {
  const {
    groundControls,
    fogControls,
    orbitControls,
    galleryItemControls,
    environmentControls,
    cameraControls,
  } = useGallerySceneSettings();

  return (
    <GalleryScene
      fog={{
        color: fogControls.fogColor,
        near: fogControls.near,
        far: fogControls.far,
      }}
      disableFog={!fogControls.enableFog}
      disableControls={!orbitControls.enableOrbitControls}
      orbitControls={{
        enableDamping: orbitControls.enableDamping,
        enableZoom: orbitControls.enableZoom,
        dampingFactor: orbitControls.dampingFactor,
        autoRotate: orbitControls.autoRotate,
        autoRotateSpeed: orbitControls.autoRotateSpeed,
        minPolarAngle: Math.PI / 2 - 0.5,
        maxPolarAngle: Math.PI / 2 - 0.01,
      }}
      disableEnvironment={!environmentControls.enableEnvironment}
      environment={{
        preset: environmentControls.preset as EnvironmentPresets,
      }}
      ground={{
        width: groundControls.width,
        height: groundControls.height,
        disableReflector: !groundControls.enableReflector,
        reflectorMaterial: {
          color: groundControls.groundColor,
          metalness: groundControls.metalness,
          roughness: groundControls.roughness,
          mirror: groundControls.mirror,
          resolution: groundControls.resolution,
          depthScale: groundControls.depthScale,
          minDepthThreshold: groundControls.minDepthThreshold,
          maxDepthThreshold: groundControls.maxDepthThreshold,
        },
        position: [0, -galleryItemControls.height / 2, 0],
      }}
      disableGround={!groundControls.enableGround}
    >
      <Gallery
        item={{
          width: galleryItemControls.width,
          height: galleryItemControls.height,
          radialSegments: galleryItemControls.radialSegments,
          heightSegments: galleryItemControls.heightSegments,
          innerRadiusPercent: galleryItemControls.innerRadiusPercent,
        }}
      >
        {children}
      </Gallery>

      {sceneElements}
      <SceneLights />
      <Stats />
      <CameraUpdate cameraControls={cameraControls} />
    </GalleryScene>
  );
};

export { DemoScene };
