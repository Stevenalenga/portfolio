import React from "react";

export const metadata = {
  title: "Blog - Stephen Mola",
  description: "Read the latest blog posts by Stephen Mola.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="blog-body bg-white text-black min-h-screen flex flex-col">
      <header className="blog-header bg-blue-500 text-white p-4">
        <h1>Welcome to the Blog</h1>
      </header>
      <main className="blog-main flex-grow p-4">{children}</main>
      <footer className="blog-footer bg-gray-200 text-center p-4">
        <p>always better</p>
      </footer>
    </div>
  );
}