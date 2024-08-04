import { useState } from "react";
import Navbar from "../../Components/Navbar";
import PasswordINput from "../../Components/Input/PasswordINput";
import { Link } from "react-router-dom";
import { validateEmail } from "../../Utils/helper";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPasssword] = useState("");
  const [error, setError] = useState(null);
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Please enter your name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          {" "}
          <form onSubmit={handleSignup}>
            <h2 className="text-2xl mb-8">Signup</h2>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordINput
              value={password}
              onChange={(e) => setPasssword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button type="submit" className="btn-primary">
              Create Account
            </button>
            <p className="text-sm text-center mt-4">
              Alrady have an account?{" "}
              <Link
                to={"/login"}
                className="font-medium text-primary underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>{" "}
      </div>
    </div>
  );
};

export default Signup;
