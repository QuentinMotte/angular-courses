export interface Contact {
  id: string,
  icon: string,
  personal:boolean,
  firstName: string,
  lastName: string,
  dateOfBirth: Date | null,
  favoritesRanking: number | null,
  phones: Phone[],
  address: Address,
  notes: string,
}

export interface Phone {
  phoneNumber: string,
  phoneType: string,
}

export interface Address {
  streetAddress: string,
  city: string,
  state: string,
  postalCode: string,
  addressType: string,
}

export const phoneTypesValues =[
  {title:'Mobile', value:'mobile'},
  {title:'Work', value:'work'},
  {title:'Other', value:'other'},
]

export const addressTypesValues =[
  {title:'Home', value:'home'},
  {title:'Work', value:'work'},
  {title:'Other', value:'other'},
]
