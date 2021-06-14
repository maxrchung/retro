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
  AddColumnRequest |
  AddCommentRequest |
  RemoveColumnRequest |
  RemoveCommentRequest

export type RequestPayload =
  AddColumnRequestPayload |
  AddCommentRequestPayload |
  RemoveColumnRequestPayload |
  RemoveCommentRequestPayload

export interface AddColumnRequest extends ReduxAction {
  type: 'retro/addColumn',
  payload: AddColumnRequestPayload
}

export interface AddColumnRequestPayload {
  name: string
}

export interface AddCommentRequest extends ReduxAction {
  type: 'retro/addComment',
  payload: AddCommentRequestPayload
}

export interface AddCommentRequestPayload {
  columnId: string,
  value: string
}

export interface AddCommentRequestPayload {
  columnId: string,
  value: string
}

export interface RemoveColumnRequest extends ReduxAction {
  type: 'retro/removeColumn',
  payload: RemoveColumnRequestPayload
}

export interface RemoveColumnRequestPayload {
  columnId: string
}

export interface RemoveCommentRequest extends ReduxAction {
  type: 'retro/removeComment',
  payload: RemoveCommentRequestPayload
}

export interface RemoveCommentRequestPayload {
  commentId: string
}

export type Response =
  GetColumnResponse |
  GetAllColumnsResponse

export type ResponsePayload =
  GetColumnResponsePayload |
  GetAllColumnsResponsePayload

export interface GetColumnResponse extends ReduxAction {
  type: 'retro/getColumn',
  payload: GetColumnResponsePayload
}

export interface GetColumnResponsePayload {
  column: Column
}

export interface GetAllColumnsResponse extends ReduxAction {
  type: 'retro/getAllColumns',
  payload: GetAllColumnsResponsePayload
}

export interface GetAllColumnsResponsePayload {
  columns: Column[]
}