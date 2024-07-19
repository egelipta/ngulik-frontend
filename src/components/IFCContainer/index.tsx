// eslint-disable-next-line react-hooks/exhaustive-deps
//@ts-ignore
import { useBVH } from '@react-three/drei';
// import { useThree } from '@react-three/fiber';
import { useRef } from 'react';
// import { MeshLambertMaterial } from 'three';
import { IFCManager } from 'web-ifc-three/IFC/components/IFCManager';
import { IFCModel } from 'web-ifc-three/IFC/components/IFCModel';

type IFCContainerProps = {
  ifc?: IFCModel;
  manager: IFCManager;
};

export default function IFCContainer({ ifc }: IFCContainerProps) {
  // const [highlightedModel, setHighlightedModel] = useState({ id: -1 });

  const mesh = useRef(null!);
  useBVH(mesh);

  // const scene = useThree((state) => state.scene);

  // const highlightMaterial = new MeshLambertMaterial({
  //   transparent: true,
  //   opacity: 0.6,
  //   color: 0xff00ff,
  //   depthTest: false,
  // });

  // const handleDblClick = (event: Intersection<IFCModel<Event>>) => {
  //   if (Object.keys(manager.state.models).length) {
  //     manager.removeSubset(highlightedModel.id, highlightMaterial);
  //   }
  //   highlight(event, highlightMaterial);
  // }

  // const highlight = (
  //   intersection: Intersection<IFCModel<Event>>,
  //   material: Material
  // ) => {
  //   const { faceIndex } = intersection;
  //   const { modelID, geometry } = intersection.object;
  //   const id = manager.getExpressId(geometry, faceIndex);

  //   setHighlightedModel({ id: modelID });

  //   manager.state.models[modelID] = ifc;

  //   manager.createSubset({
  //     modelID,
  //     ids: [id],
  //     material,
  //     scene,
  //     removePrevious: true,
  //   });
  // }

  return ifc ? (
    // eslint-disable-next-line react/no-unknown-property
    <primitive ref={mesh} object={ifc} /> //@ts-ignore
  ) : null;
}

{
  /* <primitive ref={mesh} object={ifc} onDoubleClick={handleDblClick} /> */
}
