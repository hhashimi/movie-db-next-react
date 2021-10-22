import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const register = () => {
  const router = useRouter();

  const initialState = {
    fullName: "",
    email: "",
    password: "",
    errors: {
      fullName: "",
      email: "",
      password: "",
    },
  };

  const [state, setState] = useState(initialState);
  const [submissionError, setSubmissionError] = useState("");

  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = state.errors;

    switch (name) {
      case "fullName":
        errors.fullName =
          value.length < 5 ? "Full Name must be 5 characters long!" : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Password must be 8 characters long!" : "";
        break;
      default:
        break;
    }

    setState((prevState) => {
      return {
        ...prevState,
        errors,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (validateForm(state.errors)) {
      // submit form
      const register = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(state),
        }
      );
      let response = await register.json();

      // error occured
      if (response.isBoom !== undefined) {
        setSubmissionError(response.output.payload.message);
      } else {
        // user was created - redirect to login
        router.push("/login");
      }
    }
  }

  return (
    <>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full flex flex-col">
            <h1 className="mb-8 text-3xl text-center">Register</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
                required
              />
              {state.errors.fullName && (
                <span className="text-red-500 text-sm flex pb-4">
                  {state.errors.fullName}
                </span>
              )}

              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
              />

              {state.errors.email && (
                <span className="text-red-500 text-sm flex pb-4">
                  {state.errors.email}
                </span>
              )}

              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />

              {state.errors.password && (
                <span className="text-red-500 text-sm flex pb-4">
                  {state.errors.password}
                </span>
              )}

              <button
                type="submit"
                className="btn w-full rounded text-white hover:bg-opacity-90 focus:outline-none my-1"
              >
                Create Account
              </button>
            </form>

            {submissionError && (
              <span className="text-red-500 text-sm flex py-3">
                {submissionError}
              </span>
            )}

            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the
              <a
                className="no-underline border-b border-grey-dark text-grey-dark ml-1"
                href="#"
              >
                Terms of Service
              </a>{" "}
              and
              <a
                className="no-underline border-b border-grey-dark text-grey-dark ml-1"
                href="#"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          <div className="text-grey-dark mt-6">
            Already have an account?
            <li className="no-underline border-b border-blue text-blue ml-1 inline-block">
              <Link href="/login">Log in</Link>
            </li>
            .
          </div>
        </div>
      </div>
    </>
  );
};

export default register;
