"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import "./Signup.css";

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
    };

    return (
        <div className="container">
            <div className="main-container">
                {/* Left: Signup Form */}
                <div className="form-container">
                    <h2>Create an account</h2>
                    <form onSubmit={handleSignup}>
                        <label>Full Name</label>
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
                    </form>

                    {/* Google Signup Button */}
                    <p>or signup with</p>
                    <button className="google-signup-btn" onClick={handleGoogleSignup}>
                        <Image src="/google.png" alt="Google Icon" width={24} height={24} />
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
