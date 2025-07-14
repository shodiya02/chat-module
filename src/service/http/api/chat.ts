import http from '@/service/http'
import { useQuery } from '@tanstack/vue-query'
import type { TicketsTablePaginationResponse } from '@/service/http/api/types'
import type { ComputedRef } from 'vue'

export function getTicketsList(filters: ComputedRef<any>) {
  return useQuery({
    queryKey: ['tickets', filters],
    queryFn: () => {
      return http
        .get<TicketsTablePaginationResponse>('operator/tickets/table', {
          params: filters.value
        })
        .then(res => res.data)
    }
  })
}
