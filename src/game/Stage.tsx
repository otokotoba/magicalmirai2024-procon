import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { InstancedBufferAttribute, Mesh, MeshStandardMaterial } from 'three';
import { GLTF } from 'three-stdlib';

type InstancedMesh = Mesh & { instanceMatrix: InstancedBufferAttribute };

type GLTFResult = GLTF & {
  nodes: {
    StaticMeshActor_0_StaticMeshComponent0: Mesh;
    SM_Yn: Mesh;
    SM_Yn_1: Mesh;
    StaticMeshActor_10_StaticMeshComponent0: Mesh;
    StaticMeshActor_17_StaticMeshComponent0: Mesh;
    StaticMeshActor_20_StaticMeshComponent0: Mesh;
    StaticMeshActor_36_StaticMeshComponent0: Mesh;
    StaticMeshActor_43_StaticMeshComponent0: Mesh;
    SM_wut6_1_: Mesh;
    SM_wut6_1__1: Mesh;
    StaticMeshActor_101_StaticMeshComponent0: Mesh;
    SM_LX_17: InstancedMesh;
    SM_Robot_Wash_Head: InstancedMesh;
    SM_Robot_Wash_Head_1: InstancedMesh;
    SM_LX_17001: InstancedMesh;
  };
  materials: {
    M_Dss: MeshStandardMaterial;
    M_JS_01: MeshStandardMaterial;
    M_JS_2: MeshStandardMaterial;
    MI_Nightmare: MeshStandardMaterial;
    M_FG_04: MeshStandardMaterial;
    M_Zd: MeshStandardMaterial;
    M_FG_06: MeshStandardMaterial;
    M_FG_05: MeshStandardMaterial;
    M_02: MeshStandardMaterial;
    M_FG01: MeshStandardMaterial;
    MI_Nightmare_2: MeshStandardMaterial;
    MI_Stage_ACCs_Metal_Trusses: MeshStandardMaterial;
    MI_Light_Robot_Wash: MeshStandardMaterial;
    MI_Light_Emissive_Robot_Wash: MeshStandardMaterial;
  };
};

const PATH = '/models/stage.glb';

useGLTF.preload(PATH);

export function Stage(props: JSX.IntrinsicElements['group']): JSX.Element {
  const { nodes, materials } = useGLTF(PATH) as GLTFResult;
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <group {...props} dispose={null}>
        <mesh
          geometry={nodes.StaticMeshActor_0_StaticMeshComponent0.geometry}
          material={materials.M_Dss}
          position={[0.838, -8.632, 0.053]}
          scale={[200, 113.44, 113.44]}
        />
        <group position={[-17.089, -8.395, -5.794]} scale={2}>
          <mesh geometry={nodes.SM_Yn.geometry} material={materials.M_JS_01} />
          <mesh geometry={nodes.SM_Yn_1.geometry} material={materials.M_JS_2} />
        </group>
        <mesh
          geometry={nodes.StaticMeshActor_10_StaticMeshComponent0.geometry}
          material={materials.MI_Nightmare}
          position={[-0.463, 13.107, 0]}
          scale={[1.776, 12.3, 1.776]}
        />
        <mesh
          geometry={nodes.StaticMeshActor_17_StaticMeshComponent0.geometry}
          material={materials.M_FG_04}
          position={[-9.493, -7.725, -5.449]}
          rotation={[0, -0.611, -0.96]}
        />
        <mesh
          geometry={nodes.StaticMeshActor_20_StaticMeshComponent0.geometry}
          material={materials.M_Zd}
          position={[20.311, -4.431, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.941, 0.707, 1.19]}
        />
        <mesh
          geometry={nodes.StaticMeshActor_36_StaticMeshComponent0.geometry}
          material={materials.M_FG_06}
          position={[0.605, -8.989, 0]}
          rotation={[Math.PI / 2, -1.484, Math.PI / 2]}
          scale={2.3}
        />
        <mesh
          geometry={nodes.StaticMeshActor_43_StaticMeshComponent0.geometry}
          material={materials.M_FG_05}
          position={[1.863, -2.794, 0.885]}
          scale={3.616}
        />
        <group
          position={[0.067, -8.541, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[3.65, 2.903, 3.65]}
        >
          <mesh
            geometry={nodes.SM_wut6_1_.geometry}
            material={materials.M_02}
          />
          <mesh
            geometry={nodes.SM_wut6_1__1.geometry}
            material={materials.M_FG01}
          />
        </group>
        <mesh
          geometry={nodes.StaticMeshActor_101_StaticMeshComponent0.geometry}
          material={materials.MI_Nightmare_2}
          position={[0, -7.691, 0]}
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
          args={[nodes.SM_LX_17001.geometry, materials.M_JS_01, 5]}
          instanceMatrix={nodes.SM_LX_17001.instanceMatrix}
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
            materials.MI_Light_Emissive_Robot_Wash,
            9,
          ]}
          instanceMatrix={nodes.SM_Robot_Wash_Head_1.instanceMatrix}
        />
      </group>
    </RigidBody>
  );
}
