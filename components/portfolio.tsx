import React from 'react';
import PostList from './postlist';

const posts = [
    { slug: 'codereview', title: 'Code Review' },
    { slug: 'artifact1', title: 'Software Design and Engineering' },
    { slug: 'artifact2', title: 'Algorithms & Data Structures' },
    { slug: 'artifact3', title: 'Databases' },
];

const Portfolio: React.FC = () => {
  return (
    <div>
      <PostList posts={posts} />
    </div>
  );
};

export default Portfolio;
