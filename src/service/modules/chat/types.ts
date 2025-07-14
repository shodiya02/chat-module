import type { IProject, TicketStatus } from '@/views/Tickets/types.ts'
import type { IChatTopic, IDepartment } from '@/views/Projects/types.ts'

interface IClientData {
  _id: string
  phone: string
  email: string
  name: string
  comment?: string
  userAgent?: string
  verified?: boolean
  integrationData?: Record<string, string | undefined>
  clientData?: Record<string, string | undefined>
}

export interface RemoteTicketChat {
  _id: string
  chatId: string
  client: IClientData
  clientId: string
  createdAt: string
  deadline?: string
  finished: boolean
  lastActivityAt?: string
  lastMessage?: RemoteChatMessage
  project: {
    _id: string
    name: string
  }
  projectId: string
  respondDate?: string
  source: TicketSource
  status?: TicketStatus
}

export interface LocalTicketChat {
  _id: string
  chatId: string
  client: IClientData
  clientId: string
  createdAt: Date
  deadline?: Date
  finished: boolean
  lastActivityAt?: Date
  lastMessage?: LocalChatMessage
  project: {
    _id: string
    name: string
  }
  projectId: string
  respondDate?: Date
  source: TicketSource
  status?: TicketStatus
}

export interface ITicketDetails {
  _id: string
  topicIds: string[]
  projectId: string
  clientId: string
  chatId: string
  status: TicketStatus
  ticketData: Record<string, string | undefined>
  createdAt: string
  updatedAt: string
  project: IProject
  pageViews?: {
    pageUrl: string
    pageTitle: string
    _id: string
    createdAt: string
  }[]
  client: IClientData
  deadline: string
  department: IDepartment
  departmentId: string
  finished: boolean
  operator: string
  operators: IOperator[]
  rating: TicketRating
  ratingComment: string
  respondDate: string
  topics: IChatTopic[]
  topicComment: string
  scheduledTimeToBeArchived?: string
  source: TicketSource
  description: string
}

export enum ChatMessageType {
  Text = 0,
  File = 1,
  System = 2
}

export enum ChatRatingType {
  Bad = 0,
  Good = 1,
  Excellent = 2
}

export interface RemoteChatFile {
  name: string
  path: string
  size: number
  ext: string
  createdAt?: string
}

export interface RemoteChatMessage {
  _id: string
  chat: string
  text: string
  sender: string
  replyTo?: RemoteChatMessage
  type: ChatMessageType
  createdAt: string
  updatedAt: string
  editedAt: string
  deletedAt?: string
  file?: RemoteChatFile
  meta?: {
    kind: string
  }
  extraPayload?: Record<string, unknown>
  payload?: Record<string, unknown>
  senderInfo?: ISenderInfo
}

export interface LocalChatMessage {
  _id: string
  chat: string
  text?: string
  formattedText?: string
  replyTo?: LocalChatMessage
  sender: string
  type: ChatMessageType
  createdAt: Date
  updatedAt: Date
  editedAt?: Date
  deletedAt?: Date
  file?: RemoteChatFile
  meta?: {
    kind: string
  }
  senderInfo?: ISenderInfo

  [x: string]: any
}

export interface ScreenShareLocaleMessage extends LocalChatMessage {
  payload: {
    clientAccepted: boolean
    clientOnline: boolean
    clientRejected: boolean
    closed: boolean
    operatorOnline: boolean
  }
}

export interface LocalLocationMessage extends LocalChatMessage {
  payload: { latitude: number; longitude: number }
}

export interface LocalContactMessage extends LocalChatMessage {
  payload: {
    vcard: string
    first_name: string
    last_name: string
    phone_number: string
  }
}

interface ISenderInfo {
  _id: string
  name: string
  username: string
}

export interface SystemMessage<T = any> extends LocalChatMessage {
  payload: T
}

export interface ChatRatePayload {
  clientId: string
  ticketId: string
  continued?: boolean
  closed?: boolean
  operatorName?: string
}

export interface ChatRateMessage extends SystemMessage<ChatRatePayload> {
  text: 'ticket.close'
}

export interface NewTicketPayload {
  ticketId: string
  clientId: string
  topic: string
  operatorName?: string
}

export interface TicketMessage extends SystemMessage<NewTicketTaskPayload> {
  text:
    | 'ticket.task.new'
    | 'ticket.task.in-progress'
    | 'ticket.task.done'
    | 'ticket.task.approved-by-qa'
    | 'ticket.task.rejected-by-qa'
    | 'ticket.task.approved-by-operator'
    | 'ticket.task.rejected-by-client'
    | 'ticket.task.approved-by-client'
    | 'screen-share'
    | 'ticket.switch.replyMode.manual'
    | 'ticket.switch.projectOrDepartment'
}

export interface NewTicketTaskPayload {
  ticketId: string
  ticketTaskId: string
  ticketTaskStatus: number
  ticketTaskNumber: string
  forwardedProjectName: string
  forwardedDepartmentName: string
}

export interface NewTicketTaskMessage extends SystemMessage<NewTicketTaskPayload> {
  text: 'ticket.task.new'
}

export type SomeSystemMessage = ChatRateMessage | TicketMessage | NewTicketTaskMessage
export type ClientRegisteredEvent = RemoteTicketChat

export interface IOperator {
  _id: string
  username: string
  name: string
  photoPath: string
}

export interface UpdateTicketDetails {
  ticketId: string
  clientId: string
  projectId: string
  chatId: string
  finished?: boolean
  status?: TicketStatus
}

export interface UpdateClientDetails {
  _id: string
  chatId: string
  projectId: string
  name?: string
  email?: string
  phone?: string
  status?: TicketStatus
  comment?: string
  operators: IOperator[]
}

export interface UpdateClientOnline {
  id: string
  online: number
  lastOnline?: string
}

export interface TicketRating {
  bad: number
  good: number
  excellent: number
}

export interface BaseEntity {
  _id: string
  name: { uz: string; default: string }
}

export interface ITicketStatData {
  _id: string
  messageCounts: number
  totalTickets: number
  status: {
    activeTickets: number
    draftTickets: number
    archivedTickets: number
    answeredTickets: number
  }
  rating: TicketRating
  baseEntity: BaseEntity
}

export interface UploadFileResponse {
  sent: boolean
  message: RemoteChatMessage & {
    file: RemoteChatFile
  }
}

export interface ChatUploadFile {
  id: string
  file: File
  date: Date
  progress: { total: number; loaded: number; percent: number }
  error: any
  cancel: () => void
}

export enum ChatTabType {
  New = 'new',
  Mine = 'mine',
  All = 'all'
}

export enum TicketSource {
  Telegram = 0,
  Widget = 1,
  Call = 2
}
