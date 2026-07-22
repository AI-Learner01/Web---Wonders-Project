import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        checkAdmin();
    }, []);

    async function checkAdmin() {
        try {
            const response = await fetch("http://localhost:5000/auth/verify-token", {
                method: "POST",
                credentials: "include",
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