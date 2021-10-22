import Head from "next/head";
import MoviesList from "../components/MoviesList";
import MovieMenu from "../components/MovieMenu";

export default function Home({ movies }) {
  return (
    <>
      <Head>
        <title>Movie DB App Next - Now Playing</title>
        <meta name="description" content="Next Movie DB App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MovieMenu />
      <MoviesList movies={movies} />
    </>
  );
}

export async function getServerSideProps() {
  const movies = await fetch(
    `${process.env.NEXT_PUBLIC_MOVIE_API}/movie/now_playing?page=1`
  );
  let data = await movies.json();
  return { props: { movies: data.results } };
}
