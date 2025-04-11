"use client";

import { useParams } from 'next/navigation';
import React, { useState } from 'react';

const BlogPost: React.FC = () => {
    const { slug } = useParams();
    const [comments, setComments] = useState<string[]>([]);
    const [newComment, setNewComment] = useState<string>('');
    const [likes, setLikes] = useState<number>(0);

    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments([...comments, newComment]);
            setNewComment('');
        }
    };

    const handleLike = () => {
        setLikes(likes + 1);
    };

    const handleShare = () => {
        alert('Blog shared successfully!');
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>{`Blog Post: ${slug}`}</h1>
            <p>
                This is a demo blog post for &quot;{slug}&quot;. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.
            </p>
            <div style={{ marginTop: '20px' }}>
                <button onClick={handleLike} style={{ marginRight: '10px' }}>
                    👍 Like ({likes})
                </button>
                <button onClick={handleShare}>🔗 Share</button>
            </div>
            <div style={{ marginTop: '30px' }}>
                <h2>Comments</h2>
                <div>
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <div key={index} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc' }}>
                                {comment}
                            </div>
                        ))
                    ) : (
                        <p>No comments yet. Be the first to comment!</p>
                    )}
                </div>
                <div style={{ marginTop: '20px' }}>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        rows={3}
                        style={{ width: '100%', padding: '10px' }}
                    />
                    <button onClick={handleAddComment} style={{ marginTop: '10px' }}>
                        Add Comment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;