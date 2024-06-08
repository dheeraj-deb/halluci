export type VotesType = {
  count: number;
  value: number;
}

export type PunctuationType = {
  countOpinions: number;
  punctuation: number;
  votes: VotesType[]
}

export type ReviewType = {
  name: string;
  avatar: string;
  description: string;
  punctuation: number;
}

export type ProductType = {
  id: string;
  name: string;
  description: string;
  thumb: string;
  price: string;
  count: number;
  color: string;
  size: string;
  images: string[];
  discount?: string;
  currentPrice: number;
  punctuation: PunctuationType;
  reviews: ReviewType[];
}

export type ProductTypeList = {
  id: string;
  name: string;
  price: string;
  color: string;
  images: string[];
  discount?: string;
  currentPrice?: number;
}

// export type ProductStoreType = {
//   id: string;
//   name: string;
//   thumb: string;
//   price: number;
//   count: number;
//   color: string;
//   size: string;
// }

export type GtagEventType = {
  action: string;
  category: string;
  label: string;
  value: string
}

export type Product = {
  _id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  variations: Variation[]
  price: number
}

type Variation = {

  _id: string
  color: string
  image: string

}

type FormFields = {
  otp?: string
  phone?: string
  address?: Record<string, any>
}