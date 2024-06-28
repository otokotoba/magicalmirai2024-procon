import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { InstancedBufferAttribute, Mesh, MeshStandardMaterial } from 'three';
import { GLTF } from 'three-stdlib';

type InstancedMesh = Mesh & { instanceMatrix: InstancedBufferAttribute };

type GLTFResult = GLTF & {
  nodes: {
    StaticMeshActor_0_StaticMeshComponent0: Mesh;
    StaticMeshActor_1_StaticMeshComponent0: Mesh;
    StaticMeshActor_5_StaticMeshComponent0: Mesh;
    StaticMeshActor_10_StaticMeshComponent0: Mesh;
    StaticMeshActor_17_StaticMeshComponent0: Mesh;
    StaticMeshActor_20_StaticMeshComponent0: Mesh;
    StaticMeshActor_36_StaticMeshComponent0: Mesh;
    StaticMeshActor_43_StaticMeshComponent0: Mesh;
    StaticMeshActor_55_StaticMeshComponent0: Mesh;
    StaticMeshActor_57_StaticMeshComponent0: Mesh;
    SM_MERGED_StaticMeshActor_89: Mesh;
    SM_MERGED_StaticMeshActor_89_1: Mesh;
    StaticMeshActor_81_StaticMeshComponent0: Mesh;
    StaticMeshActor_95_StaticMeshComponent0: Mesh;
    StaticMeshActor_101_StaticMeshComponent0: Mesh;
    StaticMeshActor_103_StaticMeshComponent0: Mesh;
    StaticMeshActor_105_StaticMeshComponent0: Mesh;
    StaticMeshActor_107_StaticMeshComponent0: Mesh;
    SM_LX_17: InstancedMesh;
    SM_Yn: InstancedMesh;
    SM_Yn_1: InstancedMesh;
    SM_Robot_Wash_Head: InstancedMesh;
    SM_Robot_Wash_Head_1: InstancedMesh;
    SM_LX_17001: InstancedMesh;
  };
  materials: {
    PaletteMaterial001: MeshStandardMaterial;
    M_Film: MeshStandardMaterial;
    PaletteMaterial002: MeshStandardMaterial;
    MI_Nightmare: MeshStandardMaterial;
    PaletteMaterial004: MeshStandardMaterial;
    M_Zd: MeshStandardMaterial;
    PaletteMaterial006: MeshStandardMaterial;
    M_FG_05: MeshStandardMaterial;
    M_FG01: MeshStandardMaterial;
    MI_Steel_se2abd3c_2K: MeshStandardMaterial;
    PaletteMaterial007: MeshStandardMaterial;
    PaletteMaterial003: MeshStandardMaterial;
    PaletteMaterial008: MeshStandardMaterial;
    M_Stage_ACCs_MetalMaster: MeshStandardMaterial;
    MI_Nightmare_2: MeshStandardMaterial;
    M_TX_02: MeshStandardMaterial;
    M_TX_03: MeshStandardMaterial;
    M_TX_01: MeshStandardMaterial;
    MI_Stage_ACCs_Metal_Trusses: MeshStandardMaterial;
    MI_Light_Robot_Wash: MeshStandardMaterial;
    PaletteMaterial005: MeshStandardMaterial;
  };
};

export function Stage(props: JSX.IntrinsicElements['group']): JSX.Element {
  const { nodes, materials } = useGLTF('/stage-transformed.glb') as GLTFResult;
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <group {...props} dispose={null}>
        <mesh
          geometry={nodes.StaticMeshActor_0_StaticMeshComponent0.geometry}
          material={materials.PaletteMaterial001}
          position={[1.228, -8.632, 0.053]}
          scale={[200, 113.44, 113.44]}
        />
        <mesh
          geometry={nodes.StaticMeshActor_1_StaticMeshComponent0.geometry}
          material={materials.M_Film}
          position={[5.723, -2.952, 0.288]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          scale={[9.807, 1, 5.359]}
        />
        <mesh
          geometry={nodes.StaticMeshActor_5_StaticMeshComponent0.geometry}
          material={materials.PaletteMaterial002}
          position={[-9.103, -8.159, -5.349]}
          rotation={[0, -0.611, 0]}
        />
        <mesh
          geometry={nodes.StaticMeshActor_10_StaticMeshComponent0.geometry}
          material={materials.MI_Nightmare}
          position={[-0.073, 13.107, 0.1]}
          scale={[1.776, 12.3, 1.776]}
        />
        <mesh
          geometry={nodes.StaticMeshActor_17_StaticMeshComponent0.geometry}
          material={materials.PaletteMaterial004}
          position={[-9.103, -7.725, -5.349]}
          rotation={[0, -0.611, -0.96]}
        />
        <mesh
          geometry={nodes.StaticMeshActor_20_StaticMeshComponent0.geometry}
          material={materials.M_Zd}
          position={[20.701, -4.431, 0.1]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.941, 0.707, 1.19]}
        />
        <mesh
          geometry={nodes.StaticMeshActor_36_StaticMeshComponent0.geometry}
          material={materials.PaletteMaterial006}
          position={[0.995, -8.989, 0.1]}
          rotation={[Math.PI / 2, -1.484, Math.PI / 2]}
          scale={2.3}
        />
        <mesh
          geometry={nodes.StaticMeshActor_43_StaticMeshComponent0.geometry}
          material={materials.M_FG_05}
          position={[2.253, -2.794, 0.985]}
          scale={3.616}
        />
        <mesh
          geometry={nodes.StaticMeshActor_55_StaticMeshComponent0.geometry}
          material={materials.M_FG01}
          position={[0.457, -8.541, 0.1]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[3.65, 2.903, 3.65]}
        />
        <mesh
          geometry={nodes.StaticMeshActor_57_StaticMeshComponent0.geometry}
          material={materials.MI_Steel_se2abd3c_2K}
          position={[-0.508, -7.075, 3.013]}
          scale={[0.737, 0.918, 0.721]}
        />
        <group position={[-4.415, -7.488, -2.54]}>
          <mesh
            geometry={nodes.SM_MERGED_StaticMeshActor_89.geometry}
            material={materials.PaletteMaterial007}
          />
          <mesh
            geometry={nodes.SM_MERGED_StaticMeshActor_89_1.geometry}
            material={materials.PaletteMaterial003}
          />
        </group>
        <mesh
          geometry={nodes.StaticMeshActor_81_StaticMeshComponent0.geometry}
          material={materials.PaletteMaterial008}
          position={[-2.982, -7.423, -3.963]}
        />
        <mesh
          geometry={nodes.StaticMeshActor_95_StaticMeshComponent0.geometry}
          material={materials.M_Stage_ACCs_MetalMaster}
          position={[-4.335, -7.652, 2.865]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <mesh
          geometry={nodes.StaticMeshActor_101_StaticMeshComponent0.geometry}
          material={materials.MI_Nightmare_2}
          position={[0.39, -7.691, 0.1]}
        />
        <mesh
          geometry={nodes.StaticMeshActor_103_StaticMeshComponent0.geometry}
          material={materials.M_TX_02}
          position={[1.944, -5.86, -4.614]}
        />
        <mesh
          geometry={nodes.StaticMeshActor_105_StaticMeshComponent0.geometry}
          material={materials.M_TX_03}
          position={[2.443, -6.436, 6.059]}
        />
        <mesh
          geometry={nodes.StaticMeshActor_107_StaticMeshComponent0.geometry}
          material={materials.M_TX_01}
          position={[-0.668, -6.338, -6.508]}
        />
        <instancedMesh
          args={[
            nodes.SM_LX_17.geometry,
            materials.MI_Stage_ACCs_Metal_Trusses,
            11,
          ]}
          instanceMatrix={nodes.SM_LX_17.instanceMatrix}
        />
        <instancedMesh
          args={[nodes.SM_LX_17001.geometry, materials.PaletteMaterial002, 5]}
          instanceMatrix={nodes.SM_LX_17001.instanceMatrix}
        />
        <instancedMesh
          args={[nodes.SM_Yn.geometry, materials.PaletteMaterial002, 5]}
          instanceMatrix={nodes.SM_Yn.instanceMatrix}
        />
        <instancedMesh
          args={[nodes.SM_Yn_1.geometry, materials.PaletteMaterial003, 5]}
          instanceMatrix={nodes.SM_Yn_1.instanceMatrix}
        />
        <instancedMesh
          args={[
            nodes.SM_Robot_Wash_Head.geometry,
            materials.MI_Light_Robot_Wash,
            9,
          ]}
          instanceMatrix={nodes.SM_Robot_Wash_Head.instanceMatrix}
        />
        <instancedMesh
          args={[
            nodes.SM_Robot_Wash_Head_1.geometry,
            materials.PaletteMaterial005,
            9,
          ]}
          instanceMatrix={nodes.SM_Robot_Wash_Head_1.instanceMatrix}
        />
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/stage-transformed.glb');
