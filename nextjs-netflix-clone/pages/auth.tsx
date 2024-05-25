import { useState } from "react";
import Input from "@/components/input";

const Auth = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              Sign in
            </h2>
            <div className="flex flex-col gap-4">
              <Input
                id="username"
                label="Username"
                type="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                id="email"
                label="Email"
                type="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              Login
            </button>
            <p className="text-neutral-500 mt-12">
              First time using Netflix?
              <span className="text-white ml-1 hover:underline cursor-pointer">
                Create and account
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
