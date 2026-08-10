import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

/**
 * Admin Route Component
 * 
 * This component acts as a route guard, ensuring that only admin users can access certain routes.
 * @param {React.ReactNode} children - The child nodes to render if the user is an admin
 * @returns {React.ReactNode} The child nodes if the user is an admin, otherwise a redirect to the home page
 */

export default function AdminRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        checkAdmin();
    }, []);

    async function checkAdmin() {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/verify-token`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "true" },
            });

            const data = await response.json();

            if (data.success && data.role === "admin") {
                setIsAdmin(true);
            }
        } catch (err) {
            console.error(err);
        }

        setLoading(false);
    }

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
}