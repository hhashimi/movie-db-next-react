import Link from "next/link";
import { useRouter } from "next/router";
import { BiMoviePlay, BiCameraMovie } from "react-icons/bi";

const MovieMenu = () => {
  const router = useRouter();
  const nowPlayingPage = router.pathname === "/now-playing";
  return (
    <>
      <div className="flex justify-center p-6 bg-gray-100">
        <ul className="menu items-stretch px-3 shadow-lg bg-base-100 horizontal rounded-box text-xl">
          <Link href="/movies/pages/1">
            <li
              className={`${
                !nowPlayingPage ? "border-b-2 border-blue-400" : ""
              }`}
            >
              <a>
                <BiMoviePlay />
              </a>
            </li>
          </Link>
          <Link href="/now-playing">
            <li
              className={`${
                nowPlayingPage ? "border-b-2 border-blue-400" : ""
              }`}
            >
              <a>
                <BiCameraMovie />
              </a>
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default MovieMenu;
