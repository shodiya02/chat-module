import type { TicketSourceType, TicketTaskStatus } from '@/views/Tickets/types'

export interface ITranslatableField {
  default: string
  en?: string
  ru?: string
  uz: string
  'uz-cyrl'?: string
  ar?: string
}

export interface IRegistrationPolicy {
  askEmail: boolean
  askName: boolean
  askPhone: boolean
  askTopic: boolean
}

export interface ITopic {
  _id?: string
  isDeleted?: boolean
  name: {
    uz: string
    default: string
  }
}

export interface IDepartment {
  _id?: string
  projectId?: string
  name: string
  isDeleted?: boolean
}

export interface IProjectDetailSettings {
  registrationEnabled: boolean
  registrationPolicy: IRegistrationPolicy
  welcomeMessage: ITranslatableField
  integrations?: {
    platon?: {
      enabled: boolean
    }

    telegram?: {
      enabled: boolean
      botToken: string
    }
  }
  widgetColor: [string, string]
  widgetEnabled: boolean
  ticketSettings: {
    chatbot: {
      accuracy: number
      isEnabled: boolean
    }
    timeToArchive: number
  }
  localization: {
    languages: string[]
  }
}

export interface IProjectDetail {
  _id: string
  name: string
  organization: string
  employees: string[]
  token: string
  settings: IProjectDetailSettings
  topics: ITopic[]
  departments: IDepartment[]
}

export enum TicketForwardingRuleEnum {
  None = 'none',
  All = 'all',
  Whitelist = 'whitelist',
  Blacklist = 'blacklist'
}


export interface IProjectForm {
  name: string
  employees: string[]
  settings: {
    widgetEnabled: boolean
    widgetColor: [string, string]
    ticketSettings: {
      chatbot: {
        isEnabled: boolean
      }
      timeToArchive: number | null
      forwardingSettings?: {
        forwardingRule: TicketForwardingRuleEnum;
        whitelist?: string[]
        blacklist?: string[]
      };
    }
    localization: {
      languages: string[]
      useCustomTranslations: boolean
    }
    ticketTaskSettings: {
      trackByDefault: boolean
      numberPrefix: string
      notificationStatuses: TicketTaskStatus[]
      smsChannels: TicketSourceType[]
    }
    registrationEnabled: boolean
    registrationPolicy: IRegistrationPolicy
    welcomeMessage: ITranslatableField
    integrations?: {
      platon: {
        enabled: boolean
      }
    }
  }
}

export interface IChatTopicNested {
  _id: string
  name: ITranslatableField
  parent?: string
  children?: IChatTopicNested[]
}

export interface IChatTopic {
  _id: string
  name: ITranslatableField
  sortOrder: number
}
