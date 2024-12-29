import React, { useCallback, useState } from 'react';
import Dagre from '@dagrejs/dagre';
import { ReactFlowProvider, ReactFlow, Panel, useNodesState, useEdgesState, useReactFlow } from '@xyflow/react';

import { initialNodes, initialEdges } from './nodes-edges.js';
import '@xyflow/react/dist/style.css';

const getLayoutedElements = (nodes, edges, options, width) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: options.direction, width });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) =>
    g.setNode(node.id, {
      ...node,
      width: node.measured?.width ?? 0,
      height: node.measured?.height ?? 0,
    }),
  );

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const position = g.node(node.id);
      const x = position.x - (node.measured?.width ?? 0) / 2;
      const y = position.y - (node.measured?.height ?? 0) / 2;

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

   
const LayoutFlow = () => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  
  
  const onLayout = useCallback(
    (direction) => {
      const viewportWidth = window.innerWidth;
      const infoPanelWidth = selectedNode ? viewportWidth * 0.25 : 0; // Use 25vw width for the info panel
      const availableWidth = viewportWidth - infoPanelWidth; // Calculate remaining width
  
      const layouted = getLayoutedElements(nodes, edges, { direction }, availableWidth);
  
      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);
  
      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges, selectedNode], // Include selectedNode as a dependency
  );
  
  const onNodeClick = (_, node) => {
    setSelectedNode(node);
    onLayout('TB'); // Re-layout the graph when a node is selected
  };

  const onPaneClick = () => {
    setSelectedNode(null);
    onLayout('TB'); // Re-layout the graph when the info panel is dismissed
  };
  

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        paddingRight: selectedNode ? '25vw' : '0', // Adjust padding based on info panel visibility
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick} // Dismiss the info panel on background click
        fitView
      >
        <Panel position="bottom-left">
          <button onClick={() => onLayout('TB')}>vertical layout</button>
          {/* <button onClick={() => onLayout('LR')}>horizontal layout</button> */}
        </Panel>
      </ReactFlow>
      <InfoPanel selectedNode={selectedNode} />
    </div>
  );
};

function InfoPanel({ selectedNode }) {
  if (!selectedNode) {
    return null; // Render nothing if no node is selected
  }

  return (
    <div style={{
      position: 'absolute',
      right: 0,
      top: 0,
      width: '25vw',
      height: '100%',
      background: '#f0f0f0',
      borderLeft: '1px solid #ccc',
      padding: '16px', 
      boxSizing: 'border-box',
    }}>
      <h3>Node Information</h3>
      <p><strong>ID:</strong> {selectedNode.id}</p>
      <p><strong>Label:</strong> {selectedNode.data.label}</p>
    </div>
  );
}

export default function () {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  );
}
