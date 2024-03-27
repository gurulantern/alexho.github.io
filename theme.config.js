import Image from 'next/image';
const YEAR = new Date().getFullYear();

export default {
  logo: (
    <div>
      <img 
        src='/images/Water Emblem.png'
        alt='Logo'
        width={75}
        height={75}
        style={{ marginRight: '.4em', verticalAlign: 'middle'}} 
      />
    </div>
  ),
  footer: (
    <footer>
      <small>
        <time>{YEAR}</time> © Alex Ho.
        <a href="/feed.xml">RSS</a>
      </small>
      <style jsx>{`
        footer {
          margin-top: 8rem;
        }
        a {
          float: right;
        }
      `}</style>
    </footer>
  ),
};
