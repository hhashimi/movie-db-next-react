import Link from "next/link";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";

import {
  addMovieToFavorite,
  removeMovieFromFavorite,
} from "../features/user/userSlice";

const Movie = ({ movie }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  let favoriteMoviesArr = Object.values(user.favoriteMovies);

  let heart;
  if (favoriteMoviesArr.includes(movie.id.toString())) {
    heart = (
      <span className="text-red-500">
        <AiFillHeart />
      </span>
    );
  } else {
    heart = (
      <span className="text-black">
        <AiOutlineHeart />
      </span>
    );
  }

  async function favoriteMovie() {
    let apiRoute = null;
    if (!favoriteMoviesArr.includes(movie.id.toString())) {
      apiRoute = `${process.env.NEXT_PUBLIC_API}/api/movies/add-to-favorite`;
      dispatch(addMovieToFavorite(movie.id.toString()));
    } else {
      apiRoute = `${process.env.NEXT_PUBLIC_API}/api/movies/remove-from-favorite`;
      dispatch(removeMovieFromFavorite(movie.id.toString()));
    }

    await fetch(apiRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
      body: JSON.stringify({ movieId: movie.id.toString() }),
    });
  }

  return (
    <>
      <div className="card rounded-lg flex">
        <Link href={`/movies/${movie.id}`}>
          <figure className="hover:bg-black cursor-pointer">
            <img
              className="hover:opacity-60"
              src={
                "https://www.themoviedb.org/t/p/w440_and_h660_face/" +
                movie.poster_path
              }
            />
          </figure>
        </Link>

        <div className="p-2 text-center bg-white">
          <div className="flex flex-col">
            {user.loggedIn && (
              <div
                className=" flex cursor-pointer p-1 justify-center "
                onClick={favoriteMovie}
              >
                {heart}
              </div>
            )}

            {movie.title}
          </div>
          <p className="text-gray-500 text-xs">{movie.release_date}</p>
        </div>
      </div>
    </>
  );
};

export default Movie;
