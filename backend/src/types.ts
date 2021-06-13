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
  type: 'addComment',
  columnId: string,
  value: string
}

export type Response = AddCommentResponse | GetAllColumnsResponse

export interface AddCommentResponse {
  type: 'addComment',
  column: Column
}

export interface GetAllColumnsResponse {
  type: 'getAllColumns',
  columns: Column[]
}