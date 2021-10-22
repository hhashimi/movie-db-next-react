import Head from "next/head";
import { useRouter } from "next/router";

const index = ({ data, reviews }) => {
  const router = useRouter();

  function getAvatar(path) {
    if (path && path.includes("https://")) return path.substring(1);

    return "https://i.pravatar.cc/80?u=" + path;
  }

  return (
    <>
      <Head>
        <title>
          {data.title} - {data.tagline}
        </title>
        <meta name="description" content={data.overview} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex ml-10 mt-10">
        <button className="btn btn-xs" onClick={() => router.back()}>
          &#8592; GO BACK
        </button>
      </div>

      <div className="flex flex-row flex-wrap sm:flex-nowrap justify-center p-10">
        <img
          src={
            "https://www.themoviedb.org/t/p/w440_and_h660_face/" +
            data.poster_path
          }
          className="max-h-96"
        />
        <div className="bg-white p-5">
          <p className="text-4xl">{data.title}</p>
          <p className="text-gray-400 text-sm italic">{data.tagline}</p>
          <p className="py-5">
            Release Date:{" "}
            <span className="badge badge-lg">{data.release_date}</span>
          </p>
          {data.overview}
          <div className="flex pt-5 gap-1">
            {data.genres.map((genre) => {
              return (
                <div key={genre.id} className="badge badge-ghost">
                  {genre.name}
                </div>
              );
            })}
          </div>
          <hr className="my-5" />
          <section>
            <h1 className="mt-5 text-xl font-bold mb-5">REVIEWS</h1>
            {reviews.length === 0 && (
              <p className="text-gray-500">
                There are no reviews at the moment.
              </p>
            )}
            {reviews.map((review) => {
              return (
                <div
                  key={review.id}
                  className="bg-green-50 rounded-lg p-5 mt-5"
                >
                  <div className="flex flex-row">
                    <div className="avatar">
                      <div className="mb-8 rounded-full w-14 h-14">
                        <img
                          src={getAvatar(review.author_details.avatar_path)}
                        />
                      </div>
                    </div>
                    <div className="ml-2">
                      {review.author_details.username} <br />
                      {review.created_at}
                      <hr />
                    </div>
                  </div>

                  <div>{review.content}</div>
                </div>
              );
            })}
          </section>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  let movieId = context.query.id;
  const movie = await fetch(
    `${process.env.NEXT_PUBLIC_MOVIE_API}/movie/${movieId}?api_key=b62b5b185c63262bd7c206fbdaddd286`
  );
  let data = await movie.json();

  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const movieReviews = await fetch(
    `${process.env.NEXT_PUBLIC_MOVIE_API}/movie/${movieId}/reviews?api_key=b62b5b185c63262bd7c206fbdaddd286`
  );
  let reviewsData = await movieReviews.json();

  let reviews = reviewsData.results;

  return { props: { data, reviews } };
}

export default index;
