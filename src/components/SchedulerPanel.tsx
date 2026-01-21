'use client';

import { useAppStore } from '@/lib/store';

function formatDate(dateString: string | null) {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleString('ko-KR');
}

export default function SchedulerPanel() {
  const { schedulerStatus, loadSchedulerStatus, loading, error } = useAppStore();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold mb-4">스케줄러 상태</h2>
          
          <div className="flex gap-4 items-center">
            <button
              onClick={loadSchedulerStatus}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? '로딩중...' : '상태 확인'}
            </button>
          </div>
        </div>

        <div className="p-4">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-medium text-red-800 mb-2">오류 발생</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {!schedulerStatus && !loading && !error && (
            <div className="text-center text-gray-500 py-8">
              <p className="mb-2">스케줄러 상태를 확인하려면</p>
              <p>위의 버튼을 클릭하세요</p>
            </div>
          )}

          {schedulerStatus && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-3">스케줄러 정보</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">마지막 동기화:</span>
                    <span className="font-medium">
                      {formatDate(schedulerStatus.last_sync_at)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">다음 동기화:</span>
                    <span className="font-medium text-blue-600">
                      {formatDate(schedulerStatus.next_sync_at)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-500">
                <p>• 스케줄러는 자동으로 올리브영 데이터를 동기화합니다</p>
                <p>• 수동 동기화는 데모에서 제외되었습니다</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}