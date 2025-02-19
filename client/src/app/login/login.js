"use client"; // Needed for useState in Next.js App Router
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js Router
import "./login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter(); // Next.js navigation

    const handleLogin = (e) => {
        e.preventDefault();
        if (email && password) {
            alert("Login successful!"); 
            router.push("/dashboard"); // Redirect after login
        } else {
            alert("Please enter your email and password.");
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <label>Email</label>
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />

                    <label>Password</label>
                    <input 
                        type="password" 
                        placeholder="Enter your password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />

                    <button type="submit">Login</button>

                    <p>Don't have an account? <a href="/signup">Sign Up</a></p>
                </form>
            </div>
        </div>
    );
}