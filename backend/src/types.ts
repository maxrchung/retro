export interface Column {
  uuid: string,
  name: string,
  comments: Comment[]
}

export interface Comment {
  uuid: string,
  value: string
}