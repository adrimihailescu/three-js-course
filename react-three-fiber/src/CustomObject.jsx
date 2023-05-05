import * as THREE from "three";
import { useMemo, useRef, useEffect } from "react";

export default function CustomObject() {
  //calculate normals we use useRef hook to get the reference of the geometry
  const geometryRef = useRef();

  const verticesCount = 10 * 3;

  //useMemo hook to save the calculation of the positions so it does not get calculated on each render
  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3);

    for (let i = 0; i < verticesCount * 3; i++)
      positions[i] = (Math.random() - 0.5) * 3;
    return positions;
  }, []);

  //useEffect to get the normals only after the first render happens
  useEffect(() => {
    geometryRef.current.computeVertexNormals();
  }, []);
  return (
    <mesh>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={verticesCount}
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>
      <meshStandardMaterial color="purple" side={THREE.DoubleSide} />
    </mesh>
  );
}
