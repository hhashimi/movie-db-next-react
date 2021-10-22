import Movie from "./Movie";

const MoviesList = ({ movies, search }) => {
  return (
    <>
      <div
        className={
          !search
            ? "grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 p-4"
            : "carousel carousel-center"
        }
      >
        {movies.map((movie) => (
          <div
            className={!search ? "" : "carousel-item w-32 p-2 bg-green-100"}
            key={movie.id}
          >
            <Movie key={movie.id} movie={movie} />
          </div>
        ))}
      </div>
    </>
  );
};

export default MoviesList;
