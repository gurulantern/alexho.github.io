import Image from 'next/image';
import Link from 'next/link';
const YEAR = new Date().getFullYear();

export default {
  logo: (
    <img 
      src='/images/Water Emblem.png'
      alt='Logo'
      width={75}
      height={75}
    />
  ),
  footer: (
    <footer>
      <small>
        <time>{YEAR}</time> © Alex Ho.
        <a href="/feed.xml">RSS</a>
      </small>
      <style jsx>{`
        a {
          float: right;
        }
      `}</style>
    </footer>
  ),
  navs: [

  ]
};
