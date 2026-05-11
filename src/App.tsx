import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from './configs/firebase';
import Login from './pages/Login';
import Admin from './pages/Admin';

export default function App() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Đang tải...</p>
            </div>
        );
    }

    if (!user) {
        return <Login onLoginSuccess={() => {}} />;
    }

    return (
        <div>
            <Admin onLogout={handleLogout} />
        </div>
    );
}
