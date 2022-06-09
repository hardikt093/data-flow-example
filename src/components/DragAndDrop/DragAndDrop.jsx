import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  Controls,
  MarkerType,
} from "react-flow-renderer";

import Sidebar from "../Sidebar/Sidebar";
import "../../assets/css/style.css";

let id = 0;
const getId = () => `dndnode_${id++}`;
function DragAndDrop() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [lineType, setLineType] = useState("default");
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => {
        let edgeType = { type: lineType };
        if (lineType == "arrow") {
          edgeType = {
            markerEnd: {
              type: MarkerType.Arrow,
            },
            type: "custom",
          };
        }
        const addType = { ...params, ...edgeType };
        return addEdge(addType, eds);
      }),
    [lineType]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        label: "straight edge",
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            connectionLineType={ConnectionLineType.SmoothStep}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar setLineType={setLineType} />
      </ReactFlowProvider>
    </div>
  );
}

export default DragAndDrop;
