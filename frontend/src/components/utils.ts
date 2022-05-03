import { DropTargetMonitor } from 'react-dnd'

export enum ColumnHoverState {
  NONE,
  LEFT,
  RIGHT
}

export const getColumnHoverState = (
  monitor: DropTargetMonitor,
  ref: React.RefObject<HTMLDivElement>
): ColumnHoverState => {
  const current = ref.current
  if (!current) {
    return ColumnHoverState.NONE
  }

  // Mouse position
  const mouseOffset = monitor.getClientOffset()
  if (!mouseOffset) {
    return ColumnHoverState.NONE
  }

  // Bounding rect of column
  const currentRect = current.getBoundingClientRect()

  // Middle x-value of column
  const currentMiddle =
    currentRect.left + (currentRect.right - currentRect.left) / 2

  return mouseOffset.x <= currentMiddle
    ? ColumnHoverState.LEFT
    : ColumnHoverState.RIGHT
}

export enum PostHoverState {
  NONE,
  TOP,
  BOTTOM
}

export const getPostHoverState = (
  monitor: DropTargetMonitor,
  ref: React.RefObject<HTMLDivElement>
): PostHoverState => {
  if (!monitor.isOver({ shallow: true })) {
    return PostHoverState.NONE
  }

  const current = ref.current
  if (!current) {
    return PostHoverState.NONE
  }

  // Mouse position
  const mouseOffset = monitor.getClientOffset()
  if (!mouseOffset) {
    return PostHoverState.NONE
  }

  // Bounding rect of post
  const currentRect = current.getBoundingClientRect()

  // Middle y-value of post
  const currentMiddle =
    currentRect.top + (currentRect.bottom - currentRect.top) / 2

  return mouseOffset.y <= currentMiddle
    ? PostHoverState.TOP
    : PostHoverState.BOTTOM
}

export const isKeyEnterOnly = (e: React.KeyboardEvent): boolean =>
  e.key === 'Enter' && !e.altKey && !e.ctrlKey && !e.shiftKey && !e.metaKey
