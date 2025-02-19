"use client"; 
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js Router
import "./signup.css";

export default function Signup() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter(); // Next.js navigation

    const handleSignup = (e) => {
        e.preventDefault();
        if (fullName && email && password) {
            alert("Account created successfully!");
            router.push("/login"); // Redirect to login page
        } else {
            alert("Please fill in all fields.");
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <label>Full Name</label>
                    <input 
                        type="text" 
                        placeholder="Enter your full name" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                        required 
                    />

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

                    <button type="submit">Sign Up</button>

                    <p>Already have an account? <a href="/login">Login</a></p>
                </form>
            </div>
        </div>
    );
}