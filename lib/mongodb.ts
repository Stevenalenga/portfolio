import type { ObjectId } from "mongodb"

export interface Comment {
  _id?: ObjectId
  text: string
  author: string
  createdAt: Date
}

export interface Blog {
  _id?: ObjectId
  title: string
  body: string
  datePosted: Date
  comments: Comment[]
  likes: number
  slug: string
}
