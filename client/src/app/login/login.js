"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import "./login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        if (email && password) {
            alert("Login successful!");
            router.push("/dashboard");  // ✅ Make sure "/dashboard/page.js" exists
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
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <button type="submit">Login</button>
                    <p>Don't have an account? <Link href="/signup">Sign Up</Link></p>
                </form>
            </div>
        </div>
    );
}
