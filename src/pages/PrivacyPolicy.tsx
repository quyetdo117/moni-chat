import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
    return (
        <div className="privacy-wrapper">
            <div className="privacy-header">
                <Link to="/login" className="privacy-back-link">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Quay lại
                </Link>
            </div>

            <div className="privacy-container">
                <div className="privacy-content-card">
                    <div className="privacy-brand">
                        <img src="/logo.png" alt="MoniBook" className="privacy-logo" />
                        <h1 className="privacy-title">CHÍNH SÁCH QUYỀN RIÊNG TƯ</h1>
                        <p className="privacy-app-name">Ứng dụng: MoniBook: Quản Lý Chi Tiêu</p>
                        <p className="privacy-date">Ngày cập nhật: 14/05/2026</p>
                    </div>

                    <div className="privacy-welcome">
                        <p>Chào mừng bạn đến với <strong>MoniBook</strong>. Chúng tôi cam kết bảo vệ quyền riêng tư của bạn. Chính sách này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn khi bạn sử dụng ứng dụng.</p>
                    </div>

                    <div className="privacy-section">
                        <h2 className="privacy-section-title">
                            <span className="privacy-section-icon">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </span>
                            1. Thu thập thông tin
                        </h2>
                        <p>Chúng tôi thu thập các loại thông tin sau để cung cấp và cải thiện dịch vụ:</p>
                        
                        <div className="privacy-subsection">
                            <div className="privacy-item">
                                <strong>Thông tin tài khoản:</strong> Khi bạn đăng ký hoặc sử dụng tính năng đăng nhập ẩn danh (Anonymous), chúng tôi lưu trữ mã định danh duy nhất (UID) thông qua Firebase Authentication.
                            </div>
                            <div className="privacy-item">
                                <strong>Dữ liệu chi tiêu:</strong> Các bản ghi về thu nhập, chi tiêu, đầu tư và tiết kiệm mà bạn nhập vào ứng dụng sẽ được lưu trữ trên Firebase Firestore để đồng bộ hóa dữ liệu.
                            </div>
                            <div className="privacy-item">
                                <strong>Thông tin thiết bị:</strong> Chúng tôi có thể thu thập thông tin về thiết bị để tối ưu hóa hiển thị và hiệu suất.
                            </div>
                            <div className="privacy-item">
                                <strong>Dữ liệu thông báo:</strong>
                                <ul className="privacy-list">
                                    <li><strong>Thông báo từ máy chủ (FCM):</strong> Chúng tôi sử dụng Firebase Cloud Messaging để gửi các thông tin quan trọng, cập nhật tính năng hoặc nhắc nhở ghi chép chi tiêu từ hệ thống đến thiết bị của bạn.</li>
                                    <li><strong>Thông báo tại chỗ (Local Notifications):</strong> Ứng dụng sử dụng thông báo cục bộ được thiết lập trực tiếp trên thiết bị của bạn để gửi các lời nhắc nhắc nhở ghi chép chi tiêu định kỳ mà không cần thu thập hay truyền tải dữ liệu cá nhân qua internet.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="privacy-section">
                        <h2 className="privacy-section-title">
                            <span className="privacy-section-icon">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </span>
                            2. Sử dụng thông tin
                        </h2>
                        <p>Thông tin thu thập được sử dụng cho các mục đích:</p>
                        <ul className="privacy-list">
                            <li>Cung cấp các tính năng quản lý tài chính cá nhân.</li>
                            <li>Đồng bộ hóa dữ liệu giữa các thiết bị của bạn thông qua nền tảng đám mây.</li>
                            <li>Cải thiện trải nghiệm người dùng thông qua phân tích dữ liệu ẩn danh.</li>
                            <li>Hiển thị quảng cáo phù hợp thông qua Google AdMob.</li>
                        </ul>
                    </div>

                    <div className="privacy-section">
                        <h2 className="privacy-section-title">
                            <span className="privacy-section-icon">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </span>
                            3. Chia sẻ thông tin với bên thứ ba
                        </h2>
                        <p>Chúng tôi hợp tác với các dịch vụ bên thứ ba uy tín để vận hành ứng dụng:</p>
                        <ul className="privacy-list">
                            <li><strong>Google Firebase:</strong> Cung cấp dịch vụ xác thực, cơ sở dữ liệu và thông báo đẩy.</li>
                            <li><strong>Google AdMob:</strong> Hiển thị quảng cáo bên trong ứng dụng.</li>
                            <li><strong>Play Integrity (App Check):</strong> Để đảm bảo bảo mật và ngăn chặn các hành vi gian lận hoặc truy cập trái phép từ bot.</li>
                        </ul>
                    </div>

                    <div className="privacy-section">
                        <h2 className="privacy-section-title">
                            <span className="privacy-section-icon">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </span>
                            4. Quyền của người dùng
                        </h2>
                        <ul className="privacy-list">
                            <li>Bạn có quyền truy cập, sửa đổi hoặc yêu cầu xóa dữ liệu chi tiêu cá nhân của mình bất kỳ lúc nào ngay trong ứng dụng.</li>
                            <li>Bạn có quyền từ chối cung cấp một số thông tin, tuy nhiên điều này có thể làm hạn chế một số tính năng của MoniBook.</li>
                        </ul>
                    </div>

                    <div className="privacy-section">
                        <h2 className="privacy-section-title">
                            <span className="privacy-section-icon">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </span>
                            5. Bảo mật dữ liệu
                        </h2>
                        <p>Chúng tôi thực hiện các biện pháp bảo mật nghiêm ngặt bao gồm thực thi App Check để bảo vệ dữ liệu khỏi sự truy cập trái phép. Tuy nhiên, không có phương thức truyền tải qua internet nào là an toàn 100%, vì vậy chúng tôi không thể đảm bảo an ninh tuyệt đối.</p>
                    </div>

                    <div className="privacy-section">
                        <h2 className="privacy-section-title">
                            <span className="privacy-section-icon">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </span>
                            6. Liên hệ
                        </h2>
                        <p>Nếu bạn có bất kỳ câu hỏi nào về chính sách này, vui lòng liên hệ với chúng tôi qua:</p>
                        <div className="privacy-contact">
                            <div className="privacy-contact-item">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>Email: <a href="mailto:support.monibook@gmail.com" className="privacy-email-link">support.monibook@gmail.com</a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}