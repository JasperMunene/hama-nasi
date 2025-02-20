"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import "./Signup.css";

export default function Signup() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSignup = (e) => {
        e.preventDefault();
        if (fullName && email && password) {
            alert("Account created successfully!");
            router.push("/login");  // ✅ Ensure "/login/page.js" exists
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
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                        required 
                    />
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
                    <button type="submit">Sign Up</button>
                    <p>Already have an account? <Link href="/login">Login</Link></p>
                </form>
            </div>
        </div>
    );
}
