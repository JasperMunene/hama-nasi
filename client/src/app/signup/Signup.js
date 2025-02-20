"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import "./Signup.css";
import Image from "next/image";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSignup = (e) => {
        e.preventDefault();
        if (name && email && password) {
            alert("Signup successful!");
            router.push("/dashboard");
        } else {
            alert("Please fill in all fields.");
        }
    };

    const handleGoogleSignup = () => {
        alert("Google signup clicked! Implement OAuth here.");
        // Redirect to Google OAuth or authentication logic
    };

    return (
        <div className="container">
            <div className="main-container">
                
                {/* Left: Signup Form */}
                <div className="form-container">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSignup}>
                        <label>Name</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
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

                        <p>
                            Already have an account? <Link href="/login">Login</Link>
                        </p>
                    </form>

                    {/* Google Signup Button */}
                    <button className="google-signup-btn" onClick={handleGoogleSignup}>
                        <Image src="/google.png" alt="Google Icon" width={48} height={48} />
                    </button>
                </div>

                {/* Right: Illustration */}
                <div className="image-container">
                    <Image src="/image.png" alt="Signup Illustration" width={400} height={300} />
                </div>
            </div>
        </div>
    );
}
