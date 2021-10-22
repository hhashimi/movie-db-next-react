import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <footer className="p-6 footer bg-base-300 text-base-content footer-center">
        <div className="flex">
          <Link href="https://www.themoviedb.org/">
            <img
              src="/tmdb_logo.svg"
              className="cursor-pointer w-28"
              alt="TMDB Logo"
            />
          </Link>
          <p>Copyright © 2021 - All right reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
