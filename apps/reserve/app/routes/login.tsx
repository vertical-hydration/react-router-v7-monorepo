import { useSearchParams } from "react-router";
import { authClient } from "~/lib/auth-client";
import type { Route } from "./+types/login";





export default function LoginPage({ }: Route.ComponentProps) {

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Communities in Schools of Thomasville Food Pantry App
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <LoginCard />


        </div>
      </div>
    </>
  )
}


function LoginCard() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectUrl") || "/";

	const signIn = authClient.signIn;

  const discordRegister = () => signIn.social({
    provider: "discord",
    callbackURL: redirectTo,
  });
  return (
    <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
      <div>
        <div className="relative mt-10">
          <div aria-hidden="true" className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm/6 font-medium">
            <span className="bg-white px-6 text-gray-900">
              continue with
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4">
          <button
            type="button"
            onClick={discordRegister}
            className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus-visible:ring-transparent"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path
                d="M20.317 4.3698A19.7913 19.7913 0 0 0 15.885 3c-.191.345-.403.801-.552 1.168a18.268 18.268 0 0 0-5.487 0A12.595 12.595 0 0 0 9.294 3a19.736 19.736 0 0 0-4.435 1.372C2.054 8.579 1.294 12.682 1.67 16.727A19.917 19.917 0 0 0 7.8 19.864a14.162 14.162 0 0 0 1.304-2.112 12.955 12.955 0 0 1-2.041-.997c.171-.13.338-.267.499-.408 3.933 1.849 8.18 1.849 12.067 0 .162.141.329.278.499.408-.653.38-1.338.716-2.044.998.37.75.806 1.454 1.306 2.112a19.882 19.882 0 0 0 6.132-3.138c.439-4.69-.75-8.756-3.205-12.357ZM9.716 14.243c-1.181 0-2.155-1.085-2.155-2.42 0-1.335.955-2.42 2.155-2.42 1.21 0 2.174 1.095 2.153 2.42 0 1.335-.955 2.42-2.153 2.42Zm4.568 0c-1.181 0-2.153-1.085-2.153-2.42 0-1.335.955-2.42 2.153-2.42 1.211 0 2.175 1.095 2.155 2.42 0 1.335-.945 2.42-2.155 2.42Z"
                fill="currentColor"
              />
            </svg>
            <span className="text-sm/6 font-semibold">
              Sign in with Discord
            </span>
          </button>


        </div>
      </div>
    </div>
  )
}