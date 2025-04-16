import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("blogDatabase")

    const blog = await db.collection("blogs").findOne({ slug: params.slug })

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json(blog)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("blogDatabase")
    const body = await request.json()

    const result = await db.collection("blogs").updateOne({ slug: params.slug }, { $set: body })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Blog updated successfully" })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("blogDatabase")

    const result = await db.collection("blogs").deleteOne({ slug: params.slug })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Blog deleted successfully" })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 })
  }
}
