import Head from "next/head";
import MoviesList from "../components/MoviesList";
import MovieMenu from "../components/MovieMenu";

export default function Home({ movies }) {
  return <></>;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/movies/pages/1",
      permanent: false,
    },
  };
}
