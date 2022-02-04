export type Client = {
  id: number
  data: ClientData
}

export type ClientData = {
  active: boolean
  addresses: { pro?: Address; perso?: Address }
} & ContactData &
  DTCFData

export type ContactData = {
  title?: string
  firstName?: string
  lastName?: string
  company?: string
  phone?: string
  emails: { pro?: string; perso?: string }
}

export type DTCFData = {
  contact?: string
  comment?: string
  newsletter: boolean
  dtcfType?: DTCFType
}

export enum DTCFType {
  DT = 'DT',
  CF = 'CF',
}

export const ClientTitle = {
  MR: 'MR',
  MME: 'MME',
}

export type Address = {
  description?: string
  zipCode?: string
  town?: string
  country?: string
}

export type Product = {
  code: string
  name: string
}

export type Spanco = {
  productCode: string
  promo: string
  configuration?: any
  offers: Offer[]
}

export type Offer = {
  clientId?: number
  prescriptorId?: number
  progress: number
  price?: number
  comment?: string
  action?: string
}
