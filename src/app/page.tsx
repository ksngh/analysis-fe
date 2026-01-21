"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ReactFlowProvider } from "reactflow";

import { useAppStore } from "@/lib/store";
import FiltersBar from "@/components/FiltersBar";
import ProductList from "@/components/ProductList";
import DetailPanel from "@/components/DetailPanel";
import SchedulerPanel from "@/components/SchedulerPanel";

const GraphView = dynamic(() => import("@/components/GraphView"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-500">
      그래프 로딩중...
    </div>
  ),
});

export default function Home() {
  const [activeTab, setActiveTab] = useState<"main" | "scheduler">("main");
  const { error, clearError } = useAppStore();

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">올리브영 베스트 랭킹 데모</h1>

          <nav className="flex gap-4">
            <button
              onClick={() => setActiveTab("main")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === "main"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              메인
            </button>
            <button
              onClick={() => setActiveTab("scheduler")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === "scheduler"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              스케줄러
            </button>
          </nav>
        </div>
      </header>

      {error && (
        <div className="bg-red-50 border-b border-red-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-red-600 font-medium">오류:</span>
              <span className="text-red-700">{error}</span>
            </div>
            <button onClick={clearError} className="text-red-600 hover:text-red-800 font-medium">
              닫기
            </button>
          </div>
        </div>
      )}

      {activeTab === "main" ? (
        <ReactFlowProvider>
          <FiltersBar />
          <div className="flex-1 flex overflow-hidden">
            <ProductList />
            <GraphView />
            <DetailPanel />
          </div>
        </ReactFlowProvider>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <SchedulerPanel />
        </div>
      )}
    </div>
  );
}
