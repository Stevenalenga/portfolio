import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import type { Comment } from "@/lib/models"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("blogDatabase")

    const blog = await db.collection("blogs").findOne({ slug: params.slug }, { projection: { comments: 1 } })

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json(blog.comments || [])
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { slug: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("blogDatabase")
    const body = await request.json()

    const newComment: Comment = {
      text: body.text,
      author: body.author || "Anonymous",
      createdAt: new Date(),
    }

    const result = await db.collection("blogs").updateOne({ slug: params.slug }, { $push: { comments: newComment } })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json(
      {
        message: "Comment added successfully",
        comment: newComment,
      },
      { status: 201 },
    )
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Failed to add comment" }, { status: 500 })
  }
}
