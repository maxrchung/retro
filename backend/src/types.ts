export interface Column {
  id: string,
  name: string,
  comments: Comment[]
}

export interface Comment {
  id: string,
  value: string
}

export interface ReduxAction {
  type: string,
  payload: RequestPayload | ResponsePayload
}

export type Request =
  AddCommentRequest |
  RemoveCommentRequest

export type RequestPayload =
  AddCommentRequestPayload |
  RemoveCommentRequestPayload

export interface AddCommentRequest extends ReduxAction {
  type: 'retro/addComment',
  payload: AddCommentRequestPayload
}

export interface AddCommentRequestPayload {
  columnId: string,
  value: string
}

export interface RemoveCommentRequest extends ReduxAction {
  type: 'retro/removeComment',
  payload: RemoveCommentRequestPayload
}

export interface RemoveCommentRequestPayload {
  commentId: string
}

export type Response =
  GetCommentResponse |
  GetAllColumnsResponse

export type ResponsePayload =
  GetCommentResponsePayload |
  GetAllColumnsResponsePayload

export interface GetCommentResponse extends ReduxAction {
  type: 'retro/getComment',
  payload: GetCommentResponsePayload
}

export interface GetCommentResponsePayload {
  column: Column
}

export interface GetAllColumnsResponse extends ReduxAction {
  type: 'retro/getAllColumns',
  payload: GetAllColumnsResponsePayload
}

export interface GetAllColumnsResponsePayload {
  columns: Column[]
}