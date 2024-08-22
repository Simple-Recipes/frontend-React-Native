// expand/types/apiTypes.ts

export interface ApiResponse {
  code: number;
  msg: string;
  data: any[];
}

export interface WrappedData {
  data: any;
  timestamp: string;
}
