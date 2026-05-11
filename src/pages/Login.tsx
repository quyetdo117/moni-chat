import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../configs/firebase';

const ADMIN_EMAILS = [
    'doquyetads@gmail.com',
    'support@monibook.com',
];

interface LoginProps {
    onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            
            if (!ADMIN_EMAILS.includes(email.toLowerCase())) {
                await auth.signOut();
                setError('Bạn không có quyền truy cập admin panel');
                setLoading(false);
                return;
            }
            
            onLoginSuccess();
        } catch (err: any) {
            const errorMessages: Record<string, string> = {
                'auth/invalid-email': 'Email không hợp lệ',
                'auth/user-not-found': 'Không tìm thấy người dùng',
                'auth/wrong-password': 'Mật khẩu không đúng',
                'auth/too-many-requests': 'Quá nhiều lần thử, vui lòng thử lại sau',
                'auth/invalid-credential': 'Email hoặc mật khẩu không đúng',
            };
            setError(errorMessages[err.code] || 'Đăng nhập thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-split">
                {/* Left Side - Branding */}
                <div className="login-branding">
                    <div className="login-branding-content">
                        <img src="/logo.png" alt="MoniBook" className="login-brand-logo" />
                        <h1 className="login-brand-title">Moni Support</h1>
                        <p className="login-brand-subtitle">Hệ thống quản lý hỗ trợ khách hàng</p>
                        
                        <div className="login-features">
                            <div className="login-feature">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                                <span>Quản lý yêu cầu hỗ trợ</span>
                            </div>
                            <div className="login-feature">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <span>Trò chuyện trực tiếp</span>
                            </div>
                            <div className="login-feature">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <span>Thống kê & báo cáo</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="login-form-container">
                    <div className="login-card-new">
                        <h2 className="login-card-title">Đăng nhập</h2>
                        <p className="login-card-desc">Nhập thông tin để truy cập admin panel</p>

                        <form onSubmit={handleLogin} className="login-form-main">
                            <div className="login-field">
                                <label className="login-field-label">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="login-field-input"
                                    placeholder="admin@monibook.com"
                                    required
                                />
                            </div>

                            <div className="login-field">
                                <label className="login-field-label">Mật khẩu</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="login-field-input"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            {error && (
                                <div className="login-error-box">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="login-submit-btn"
                            >
                                {loading ? (
                                    <>
                                        <span className="login-spinner-new"></span>
                                        Đang đăng nhập...
                                    </>
                                ) : (
                                    'Đăng nhập'
                                )}
                            </button>
                        </form>

                        <p className="login-card-footer">
                            Chỉ dành cho quản trị viên
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}