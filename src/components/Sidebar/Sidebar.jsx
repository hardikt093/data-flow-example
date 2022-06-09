import React from "react";

function Sidebar(props) {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "default")}
        draggable
      >
        Add Node
      </div>
      <div>
        <select
          name="lineType"
          className="lineType"
          onChange={(e) => {
            props.setLineType(e.target.value);
          }}
        >
          <option value="default">Default</option>
          <option value="straight">Straight</option>
          <option value="step">Step</option>
          <option value="smoothstep">Smoothstep</option>
          <option value="arrow">Arrow</option>
        </select>
      </div>
    </aside>
  );
}

export default Sidebar;
