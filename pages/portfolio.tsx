import React from 'react';
import Link from 'next/link';

const Portfolio: React.FC = () => {
  return (
    <div>
      <h3>SNHU Portfolio</h3>
      <ol type="I">
          <li key="codereview">
            <Link href='/portfolio/codereview'>
                Code Review
            </Link>
          </li>
          <li key="artifact1">
            <Link href='/portfolio/artifact1'>
              Software Design and Engineering
            </Link>
          </li>
          <li key="artifact2">
            <Link href='/portfolio/artifact2'>
              Algorithms & Data Structures
            </Link>
          </li>
          <li key="artifact3">
            <Link href='/portfolio/artifact3'>
              Databases
            </Link>
          </li>
      </ol>
    </div>
  );
};

export default Portfolio;
