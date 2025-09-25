"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "./auth.css";

export default function AuthPage() {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        phone: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent, action: "signin" | "signup") => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                action: action === "signin" ? "login" : "signup",
                name: formData.name,
                phone: formData.phone,
                redirect: false,
            });

            if (result?.error) {
                setError(action === "signin" ? "Invalid credentials" : "Signup failed");
            } else {
                const session = await getSession();
                if (session) {
                    router.push("/dashboard");
                }
            }
        } catch {
            setError("An error occurred");
        } finally {
            setLoading(false);
        }
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const switchToSignUp = () => {
        setIsRightPanelActive(true);
        setError("");
        setFormData({ email: "", password: "", name: "", phone: "" });
    };

    const switchToSignIn = () => {
        setIsRightPanelActive(false);
        setError("");
        setFormData({ email: "", password: "", name: "", phone: "" });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-8" style={{ background: 'var(--surface-secondary)' }}>
            <h1 className="text-3xl md:text-5xl font-extrabold text-center" style={{ color: 'var(--brand-primary)' }}>
                CareerTrackr
            </h1>
            <div className={`auth-container ${isRightPanelActive ? 'right-panel-active' : ''}`}>
                <div className="hidden md:block">
                    <div className="form-container sign-up-container">
                        <form onSubmit={(e) => handleSubmit(e, "signup")} className="auth-form">
                            <h1>Create Account</h1>

                            <Input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="mb-2"
                            />
                            <Input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="mb-2"
                            />
                            <Input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />

                            {error && <div className="error-message">{error}</div>}

                            <Button type="submit" disabled={loading} className="auth-button">
                                {loading ? "Please wait..." : "Sign Up"}
                            </Button>

                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form onSubmit={(e) => handleSubmit(e, "signin")} className="auth-form">
                            <h1>Sign in</h1>

                            <Input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="mb-2"
                            />
                            <Input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />


                            {error && <div className="error-message">{error}</div>}

                            <Button type="submit" disabled={loading} className="auth-button">
                                {loading ? "Please wait..." : "Sign In"}
                            </Button>
                        </form>
                    </div>
                </div>


                <div className="hidden md:block overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <div>
                                Already have an account?
                                <Button variant="link" className="text-white" onClick={switchToSignIn}>
                                    Sign In
                                </Button>
                            </div>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <div className="flex items-center gap-2 text-slate-200">
                                Don&apos;t have an account?
                                <Button variant="link" className="text-white" onClick={switchToSignUp} size="sm">
                                    Sign Up
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="block md:hidden w-full max-w-sm mx-auto px-4 mobile-form-wrapper">

                <div className="transition-all duration-300 ease-in-out">
                    {!isRightPanelActive ? (
                        <div className="bg-white rounded-lg shadow-lg p-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                            <form onSubmit={(e) => handleSubmit(e, "signin")} className="auth-form">
                                <h1>Sign in</h1>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="mb-2"
                                />
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />


                                {error && <div className="error-message">{error}</div>}

                                <Button type="submit" disabled={loading} className="auth-button">
                                    {loading ? "Please wait..." : "Sign In"}
                                </Button>
                            </form>
                            <div className="text-sm flex gap-1 items-center justify-center mt-2 text-gray-400">
                                Don&apos;t have an account?
                                <Button variant="link" onClick={switchToSignUp}>
                                    Sign Up
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-lg p-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                            <form onSubmit={(e) => handleSubmit(e, "signup")} className="auth-form">
                                <h1>Create Account</h1>

                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="mb-2"
                                />
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="mb-2"
                                />
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />

                                {error && <div className="error-message">{error}</div>}

                                <Button type="submit" disabled={loading} className="auth-button">
                                    {loading ? "Please wait..." : "Sign Up"}
                                </Button>

                            </form>
                            <div className="text-sm flex gap-1 items-center justify-center mt-2 text-gray-400">
                                Already have an account?
                                <Button variant="link" onClick={switchToSignIn}>
                                    Sign In
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}