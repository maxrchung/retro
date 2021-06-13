export interface Column {
  id: string,
  name: string,
  comments: Comment[]
}

export interface Comment {
  id: string,
  value: string
}

export type Request = AddCommentRequest

export interface AddCommentRequest {
  type: 'retro/addComment',
  payload: AddCommentRequestPayload
}

export interface AddCommentRequestPayload {
  columnId: string,
  value: string
}

export type Response = AddCommentResponse | GetAllColumnsResponse

export interface AddCommentResponse {
  type: 'retro/addComment',
  payload: AddCommentResponsePayload
}

export interface AddCommentResponsePayload {
  column: Column
}

export interface GetAllColumnsResponse {
  type: 'retro/getAllColumns',
  payload: GetAllColumnsResponsePayload
}

export interface GetAllColumnsResponsePayload {
  columns: Column[]
}