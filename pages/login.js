import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const login = () => {
  const router = useRouter();

  const initialState = {
    email: "",
    password: "",
  };

  const [state, setState] = useState(initialState);
  const [submissionError, setSubmissionError] = useState("");

  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;

    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // submit form
    const login = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      }
    );
    let response = await login.json();

    // error occured
    if (response.isBoom !== undefined) {
      setSubmissionError(response.output.payload.message);
    } else {
      // user was logged in - save token & redirect to homepage
      localStorage.setItem("jwt_token", response.token);

      router.push("/");
    }
  }

  return (
    <>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full flex flex-col">
            <h1 className="mb-8 text-3xl text-center">Sign In</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
              />

              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="btn w-full rounded text-white hover:bg-opacity-90 focus:outline-none my-1"
              >
                Login
              </button>
            </form>

            {submissionError && (
              <span className="text-red-500 text-sm flex py-3">
                {submissionError}
              </span>
            )}
          </div>

          <div className="text-grey-dark mt-6">
            Don't have an account?
            <li className="no-underline border-b border-blue text-blue ml-1 inline-block">
              <Link href="/register">Register</Link>
            </li>
            .
          </div>
        </div>
      </div>
    </>
  );
};

export default login;
