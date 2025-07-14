import type { IOperator, TicketSource } from '@/service/modules/chat/types'
import type { TicketStatus } from '@/views/Tickets/types.ts'


export interface IClient {
  _id: string
  name: string
  phone: string
  email: string
  projectId: string
  integrationUser: any | null
  integrationUserId: any | null
  createdAt: string
  updatedAt: string
}

export interface PaginationResponse<TData> {
  page: number
  limit: number
  total: number
  data: TData[]
}

export interface TicketTableItem {
  _id: string
  chatId: string
  rating?: number
  ratingComment?: string
  topics: {
    _id: string
    name: { uz: string; default: string }
  }[]
  topicIds?: string[]
  project: {
    _id: string
    name: string
  }
  finished: boolean
  projectId: string
  client: IClient
  clientId: string
  description?: string
  department?: {
    _id: string
    name: string
  }
  departmentId?: string
  source: TicketSource
  status: TicketStatus
  operators: IOperator[]
  operator: IOperator
  createdAt: string
  updatedAt: string
  deadline?: string
  respondDate?: string
}

export interface TicketsMetaResponse {
  currentPage: number
  pageLimit: number
  totalCount: number
}

export interface TicketsTablePaginationResponse {
  meta: TicketsMetaResponse
  tickets: TicketTableItem[]
}
