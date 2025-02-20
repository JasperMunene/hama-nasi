"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import "./login.css";
import Image from "next/image";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        if (email && password) {
            alert("Login successful!");
            router.push("/dashboard"); 
        } else {
            alert("Please enter your email and password.");
        }
    };

    const handleGoogleLogin = () => {
        alert("Google login clicked! Implement OAuth here.");
        // Redirect to Google OAuth or authentication logic
    };

    return (
        <div className="container">
            <div className="main-container">
                
                {/* Left: Login Form */}
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

                        <p>
                            Don't have an account? <Link href="/signup">Sign Up</Link>
                        </p>
                    </form>

                    {/* Google Login Button */}
                    <button className="google-login-btn" onClick={handleGoogleLogin}>
                        <Image src="/google.png" alt="Google Icon" width={48} height={48} />
                        
                    </button>

                </div>

                {/* Right: Illustration */}
                <div className="image-container">
                    <Image src="/image.png" alt="Moving Illustration" width={400} height={300} />
                </div>

            </div>
        </div>
    );
}
