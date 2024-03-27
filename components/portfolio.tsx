import React from 'react';
import PostList from '../components/postlist';

const posts = [
    { slug: 'codereview', title: 'Code Review' },
    { slug: 'artifact1', title: 'Software Design and Engineering' },
    { slug: 'artifact2', title: 'Algorithms & Data Structures' },
    { slug: 'artifact3', title: 'Databases' },
];

const Portfolio: React.FC = () => {
  return (
    <div>
      <h3>SNHU Portfolio</h3>
      <PostList posts={posts} />
    </div>
  );
};

export default Portfolio;
