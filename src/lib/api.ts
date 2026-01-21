import { RankingItemOut, SchedulerStatus } from '@/types';

const API_BASE = '/api';

// 테스트용 함수
export async function testConnection(): Promise<any> {
  console.log('🧪 연결 테스트 시작');
  try {
    const url = `${API_BASE}/best`;
    console.log('📡 테스트 URL:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('📥 테스트 응답:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      url: response.url
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ 오류 응답 내용:', errorText);
      throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('✅ 테스트 성공:', data);
    return data;
  } catch (error) {
    console.error('❌ 연결 테스트 실패:', error);
    throw error;
  }
}

export async function getBest(): Promise<RankingItemOut[]> {
  console.log('🚀 getBest API 호출 시작');
  try {
    const url = `${API_BASE}/best`;
    console.log('📡 요청 URL:', url);
    
    const response = await fetch(url);
    console.log('📥 응답 상태:', response.status, response.statusText);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ 응답 데이터:', data);
    return data;
  } catch (error) {
    console.error('❌ API 호출 오류:', error);
    if (error instanceof TypeError) {
      throw new Error('네트워크 연결을 확인해주세요. FastAPI 서버가 실행 중인지 확인하세요.');
    }
    throw error;
  }
}

export async function getSchedulerStatus(): Promise<SchedulerStatus> {
  console.log('🚀 getSchedulerStatus API 호출 시작');
  try {
    const url = `${API_BASE}/scheduler-status`;
    console.log('📡 요청 URL:', url);
    
    const response = await fetch(url);
    console.log('📥 응답 상태:', response.status, response.statusText);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ 응답 데이터:', data);
    return data;
  } catch (error) {
    console.error('❌ API 호출 오류:', error);
    if (error instanceof TypeError) {
      throw new Error('네트워크 연결을 확인해주세요. FastAPI 서버가 실행 중인지 확인하세요.');
    }
    throw error;
  }
}