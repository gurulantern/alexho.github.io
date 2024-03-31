import React from 'react';
import Link from 'next/link';

interface Post {
  slug: string;
  title: string;
}

interface Props {
  posts: Post[];
}

const PostList: React.FC<Props> = ({ posts }) => {
  return (
    <div>
      <ol type="I">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/portfolio/${post.slug}`}>
                {post.title}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default PostList;
