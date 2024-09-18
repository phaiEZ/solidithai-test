import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeOff, IoEye } from "react-icons/io5";

const mockUser = { username: "admin", password: "password" };

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isShowHint, setIsShowHint] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("isLoggedIn") === "true") {
            navigate("/dashboard");
        }
    }, [navigate]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === mockUser.username && password === mockUser.password) {
            localStorage.setItem("isLoggedIn", "true");
            navigate("/dashboard");
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#1A1A1A]">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold text-center text-[#1A1A1A]">
                    Login to Your Account
                </h2>
                {error && <p className="text-red-500 ">{" *** " + error + " ***"}</p>}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg "
                        />
                    </div>
                    <div className="relative">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg "
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-10 right-0  pr-3 text-gray-500 hover:text-gray-700 focus:outline-none">
                            <div className=" flex justify-center">
                                {showPassword ? <IoEyeOff /> : <IoEye />}
                            </div>
                        </button>
                    </div>
                    <button
                        type="button"
                        className="flex w-full justify-end hover:underline text-gray-700"
                        onClick={() => setIsShowHint(!isShowHint)} >
                        forgot password ?
                    </button>
                    {isShowHint && <p className="text-gray-600">username is "admin" , password is "password" XD</p>}

                    <button
                        type="submit"
                        className="w-full py-3 text-white bg-black rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-indigo-300">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
