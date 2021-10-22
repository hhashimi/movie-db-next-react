import MoviesList from "../../../../components/MoviesList";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import MovieMenu from "../../../../components/MovieMenu";
import Head from "next/head";

const index = ({ data }) => {
  const router = useRouter();
  const movies = data.results;
  let pageId = parseInt(router.query.id);

  return (
    <>
      <Head>
        <title>Popular Movies - Page {pageId}</title>
        <meta name="description" content="Popular Movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MovieMenu />
      <MoviesList movies={movies} />
      <div className="flex p-5 justify-center">
        <ReactPaginate
          previousLabel="«"
          nextLabel="»"
          breakLabel={"..."}
          pageCount={data.total_pages}
          initialPage={pageId - 1}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          disableInitialCallback={true}
          onPageChange={(e) => {
            router.push("/movies/pages/" + (e.selected + 1));
          }}
          containerClassName="flex flex-row"
          activeClassName="bg-green-200"
          pageClassName="cursor-pointer hover:bg-green-50 rounded"
          activeLinkClassName="outline-none"
          pageLinkClassName="outline-none px-4"
          previousClassName="px-2"
          nextClassName="px-2"
        />
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  let pageId = context.query.id;
  const movies = await fetch(
    `${process.env.NEXT_PUBLIC_MOVIE_API}/movie/popular?page=${pageId}&api_key=b62b5b185c63262bd7c206fbdaddd286`
  );
  let data = await movies.json();

  if (!data || pageId > 500) {
    return {
      redirect: {
        destination: "/movies/pages/1",
        permanent: false,
      },
    };
  }

  return { props: { data } };
}

export default index;
