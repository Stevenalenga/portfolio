import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import type { Blog } from "@/lib/models"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("blogDatabase")

    const blogs = await db.collection("blogs").find({}).sort({ datePosted: -1 }).toArray()

    return NextResponse.json(blogs)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db("blogDatabase")
    const body = await request.json()

    const newBlog: Blog = {
      title: body.title,
      body: body.body,
      datePosted: new Date(),
      comments: [],
      likes: 0,
      slug: body.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-"),
    }

    const result = await db.collection("blogs").insertOne(newBlog)

    return NextResponse.json(
      {
        message: "Blog created successfully",
        id: result.insertedId,
      },
      { status: 201 },
    )
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 })
  }
}
