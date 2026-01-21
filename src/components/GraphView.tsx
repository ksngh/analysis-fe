"use client";

import React, { useMemo, useCallback, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  type NodeTypes,
  type NodeMouseHandler,
} from "reactflow";
import "reactflow/dist/style.css";

import { useAppStore } from "@/lib/store";
import { createGraphData, filterItems } from "@/lib/graph";

const BrandNode = ({ data }: { data: any }) => (
  <div className="px-4 py-2 bg-blue-500 text-white rounded-lg border-2 border-blue-600 cursor-pointer hover:bg-blue-600 transition-colors">
    <div className="font-semibold">{data.label}</div>
    <div className="text-xs opacity-80">{data.products?.length || 0} 제품</div>
  </div>
);

const ProductNode = ({ data }: { data: any }) => (
  <div className="px-3 py-2 bg-white border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:shadow-md transition-all max-w-48">
    <div className="font-medium text-sm truncate">{data.label}</div>
    {data.item?.rank && <div className="text-xs text-gray-500">#{data.item.rank}</div>}
  </div>
);

const FlagNode = ({ data }: { data: any }) => (
  <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full border border-green-300 cursor-pointer hover:bg-green-200 transition-colors text-sm">
    {data.label}
  </div>
);

const nodeTypes: NodeTypes = {
  brand: BrandNode,
  product: ProductNode,
  flag: FlagNode,
};

function FlowComponent() {
  const { items, filters, setSelectedNode } = useAppStore();

  const filteredItems = useMemo(() => filterItems(items, filters), [items, filters]);

  const { nodes: graphNodes, edges: graphEdges } = useMemo(() => {
    return createGraphData(filteredItems, filters.showFlags);
  }, [filteredItems, filters.showFlags]);

  const initialNodes = useMemo(
    () =>
      graphNodes.map((node) => ({
        ...node,
        type: node.type,
      })),
    [graphNodes]
  );

  const initialEdges = useMemo(
    () =>
      graphEdges.map((edge) => ({
        ...edge,
        style: { stroke: "#94a3b8", strokeWidth: 1 },
        type: "straight",
      })),
    [graphEdges]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  const onNodeClick: NodeMouseHandler = useCallback(
    (_, node) => {
      const graphNode = graphNodes.find((n) => n.id === node.id);
      if (graphNode) setSelectedNode(graphNode);
    },
    [graphNodes, setSelectedNode]
  );

  return (
    <div className="w-full h-full" style={{ minHeight: 0 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default function GraphView() {
  const { items } = useAppStore();

  if (items.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-gray-500 mb-2">데이터를 불러와주세요</div>
          <div className="text-sm text-gray-400">상단의 새로고침 버튼을 클릭하세요</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50" style={{ minHeight: 0 }}>
      <FlowComponent />
    </div>
  );
}
