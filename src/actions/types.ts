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
  id: number
  data: ProductData
}

export type ProductData = {
  code: string
  name: string
}

export type Spanco = {
  id: number
  productId: number
  data: SpancoData
  nbOffers: number
}

export type SpancoData = {
  promo: string
  configuration?: SpancoConfiguration
}

export type SpancoConfiguration = {
  steps: string[]
}

export type Offer = {
  id: number
  spancoId: number
  data: OfferData
}

export type OfferData = {
  clientId?: number | null
  prescriptorId?: number | null
  progress: number
  price?: number | null
  comment?: string
  action?: string
  probability?: number | null
  followedBy?: string
  pro?: boolean
}
