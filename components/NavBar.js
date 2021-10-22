import Link from "next/link";
import { useEffect, useState } from "react";
import MoviesList from "./MoviesList";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/user/userSlice";
import { useRouter } from "next/router";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";

const Nav = () => {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.loggedIn);

  function handleSearchChange(event) {
    let searchInput = event.target.value;
    setSearchValue(searchInput);
    searchInput.length > 1
      ? setShowSearchModal(true)
      : setShowSearchModal(false);
  }

  useEffect(() => {
    if (showSearchModal && searchValue.length > 1) {
      async function searchMovies(context) {
        const movie = await fetch(
          `${process.env.NEXT_PUBLIC_MOVIE_API}/search/movie?query=${searchValue}`
        );
        let data = await movie.json();
        setMovies(data.results);
      }

      searchMovies();
    }
  }, [searchValue]);

  return (
    <>
      <div className="navbar flex mb-2 shadow-lg bg-neutral text-neutral-content rounded-none">
        <div className="flex-none px-2 mx-2">
          <Link href="/movies/pages/1">
            <span className="cursor-pointer text-lg font-bold">movieDB</span>
          </Link>
        </div>

        <div className="flex w-full justify-end">
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={handleSearchChange}
                className="w-full pr-16 input text-black focus:ring-0 h-7"
              />
              {showSearchModal && (
                <button
                  className="absolute -top-2.5 -right-1 rounded-l-none btn text-xl"
                  onClick={() => {
                    setSearchValue("");
                    setShowSearchModal(false);
                  }}
                >
                  <TiDeleteOutline />
                </button>
              )}
            </div>
          </div>

          <div className="flex px-2 mx-2 justify-end">
            {!loggedIn && (
              <div className="flex flex-row">
                <Link href="/login">
                  <a className="btn btn-ghost btn-sm rounded-btn">
                    <AiOutlineLogin />
                    <span className="hidden px-2 sm:flex">Login</span>
                  </a>
                </Link>
                <Link href="/register">
                  <a className="btn btn-ghost btn-sm rounded-btn">
                    <AiOutlineUserAdd />
                    <span className="hidden px-2 sm:flex">Register</span>
                  </a>
                </Link>
              </div>
            )}
            {loggedIn && (
              <div className="items-stretch md:flex">
                <a
                  className="btn btn-ghost btn-sm rounded-btn"
                  onClick={() => {
                    dispatch(logout());
                    router.push("/movies/pages/1");
                  }}
                >
                  <RiLogoutCircleRLine />
                  <span className="hidden px-2 sm:flex">Logout</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {showSearchModal && <MoviesList movies={movies} search={true} />}
    </>
  );
};

export default Nav;
