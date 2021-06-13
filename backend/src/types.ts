export interface Column {
  id: string,
  name: string,
  comments: Comment[]
}

export interface Comment {
  id: string,
  value: string
}

export interface Request {
  type: string,
  payload: RequestPayload
}

export type RequestPayload = AddCommentRequestPayload

export interface AddCommentRequest extends Request {
  type: 'retro/addComment',
  payload: AddCommentRequestPayload
}

export interface AddCommentRequestPayload {
  columnId: string,
  value: string
}

export interface Response {
  type: string,
  payload: ResponsePayload
}

export type ResponsePayload = AddCommentResponsePayload | GetAllColumnsResponsePayload

export interface AddCommentResponse extends Response {
  type: 'retro/addComment',
  payload: AddCommentResponsePayload
}

export interface AddCommentResponsePayload {
  column: Column
}

export interface GetAllColumnsResponse extends Response  {
  type: 'retro/getAllColumns',
  payload: GetAllColumnsResponsePayload
}

export interface GetAllColumnsResponsePayload {
  columns: Column[]
}