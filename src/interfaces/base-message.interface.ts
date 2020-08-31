export interface BaseMessage {
  statusCode: number,
  message: string[],
  error?: string
}