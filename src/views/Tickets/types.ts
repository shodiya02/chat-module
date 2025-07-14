export enum TicketStatus {
  Draft = -1,
  Archived = 0,
  HasUpdate = 1,
  Answered = 2
}

export enum TicketFormType {
  CREATE = 'create',
  EDIT = 'edit'
}

export enum TicketTaskStatus {
  New,
  OnProgress,
  Done,
  ApprovedByQA,
  RejectedByQA,
  ApprovedByClient,
  RejectedByClient,
  ApprovedByOperator,

  // Custom only for frontend !isSkipped && done = testing
  TestingByQA = 1000
}

export enum ClientTicketTaskActions {
  ApprovedByClient = TicketTaskStatus.ApprovedByClient,
  RejectedByClient = TicketTaskStatus.RejectedByClient
}

export enum TicketSourceType {
  Telegram = 0,
  Widget = 1,
  Call = 2
}

export enum TicketTaskPriority {
  Low = 0,
  Medium = 1,
  High = 2,
  Critical = 3
}

export interface ITag {
  _id?: string
  isDeleted?: boolean
  name: {
    uz: string
    default: string
  }
}

export interface IProject {
  _id?: string
  name: string
}

export interface IExecutor {
  _id: string
  name: string
}

export interface IAuthor {
  _id?: string
  name: string
}

export interface ITicketActivity {
  _id: string
  actorName: string
  type: TicketTaskActivityType
  createdAt: string
  payload?: {
    oldStatus?: TicketTaskStatus
    newStatus?: TicketTaskStatus
    comment?: string
    files?: string[]
  }
}

export interface ITicketTask {
  _id?: string
  number: string
  ticketId: string
  projectId: string
  executors: IExecutor[]
  tags?: string[]
  priority?: TicketTaskPriority
  status?: TicketTaskStatus
  createdAt: string
  deadline?: string
  description: string
  files?: File[]
  filePaths?: string[]
  project?: IProject
  author?: IAuthor
  ticket?: {
    client: {
      name: string
      phone: string
      email: string
    }
  }
  type: TicketTaskType
  smartOfficeTicket?: {
    departmentId: string
    completedWorkDescription?: string
    webUrl?: string
  }
  rejectionReason?: string
  rejectionFiles?: string[]
  rate?: number
  skip: boolean
  ticket_activity?: ITicketActivity[]
}

export enum TicketTaskType {
  INTERNAL = 'internal',
  SMART_OFFICE = 'smartOffice'
}

export enum TicketTaskActivityType {
  CREATE = 'CREATE',
  CHANGE_STATUS = 'CHANGE_STATUS',
  UPDATE = 'UPDATE'
}

export interface ISmartOfficeDepartment {
  id: string
  name: string
  orgId: string
  telegram_channel_id: string
  telegram_channel_name: string
  telegram_channel_username: string
}

export enum TicketTaskRateEnum {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5
}

export interface RateTicketTaskDto {
  ticketTaskId: string
  type: ClientTicketTaskActions
  pin: string
  comment?: string
  rate?: TicketTaskRateEnum
}
