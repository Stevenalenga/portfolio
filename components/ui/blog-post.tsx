"use client"

import { useState } from "react"
import type { Blog } from "@/lib/models"

interface BlogPostProps {
  blog: Blog
}

export default function BlogPost({ blog }: BlogPostProps) {
  const [likes, setLikes] = useState(blog.likes)
  const [comments, setComments] = useState(blog.comments.map((comment) => comment.text))
  const [newComment, setNewComment] = useState("")

  const handleLike = async () => {
    try {
      const res = await fetch(`/api/blogs/${blog.slug}/like`, {
        method: "POST",
      })

      if (res.ok) {
        const data = await res.json()
        setLikes(data.likes)
      }
    } catch (error) {
      console.error("Error liking post:", error)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.body.substring(0, 100) + "...",
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const handleAddComment = async () => {
    if (!newComment.trim()) return

    try {
      const res = await fetch(`/api/blogs/${blog.slug}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newComment,
          author: "Anonymous User", // You could add user authentication here
        }),
      })

      if (res.ok) {
        setComments([...comments, newComment])
        setNewComment("")
      }
    } catch (error) {
      console.error("Error adding comment:", error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-500 mb-4">Posted on {new Date(blog.datePosted).toLocaleDateString()}</p>
      <div className="prose max-w-none mb-6">{blog.body}</div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={handleLike}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition"
        >
          👍 Like ({likes})
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition"
        >
          🔗 Share
        </button>
      </div>

      <div className="border-t pt-6">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>

        <div className="space-y-4 mb-6">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-md">
                {comment}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          )}
        </div>

        <div className="space-y-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            rows={3}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={handleAddComment}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  )
}
