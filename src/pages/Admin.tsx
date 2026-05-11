import { useState, useCallback } from 'react';
import { useTickets, TicketFilter } from '../hooks/useTickets';
import { useChat } from '../hooks/useChat';
import { SupportTicket } from '../types';
import TicketList from '../components/TicketList';
import ChatView from '../components/ChatView';

export default function Admin({ onLogout }: { onLogout?: () => void }) {
    const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
    const [filter, setFilter] = useState<TicketFilter>('all');
    const [searchTerm, setSearchTerm] = useState('');

    const {
        tickets,
        loading,
        openCount,
        closedCount,
        handleCloseTicket,
        handleReopenTicket,
    } = useTickets();

    const filteredTickets = tickets.filter((ticket) => {
        if (filter === 'open') return ticket.status === 'open';
        if (filter === 'closed') return ticket.status === 'closed';
        return true;
    });

    const displayedTickets = searchTerm
        ? filteredTickets.filter(
              (t) =>
                  t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  t.user_id.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : filteredTickets;

    const { messages, loading: messagesLoading, sending, handleSendMessage } = useChat(
        selectedTicket?.id || '',
        selectedTicket?.user_id || ''
    );

    const handleSelectTicket = useCallback((ticket: SupportTicket) => {
        setSelectedTicket(ticket);
    }, []);

    const handleClose = useCallback(async () => {
        if (!selectedTicket) return;
        const success = await handleCloseTicket(selectedTicket.id);
        if (success) {
            setSelectedTicket((prev) => (prev ? { ...prev, status: 'closed' } : null));
        }
    }, [selectedTicket, handleCloseTicket]);

    const handleReopen = useCallback(async () => {
        if (!selectedTicket) return;
        const success = await handleReopenTicket(selectedTicket.id);
        if (success) {
            setSelectedTicket((prev) => (prev ? { ...prev, status: 'open' } : null));
        }
    }, [selectedTicket, handleReopenTicket]);

    return (
        <div className="admin-container">
            {/* Header - Command Bar Style */}
            <header className="admin-header">
                <div className="admin-header-top">
                    <div className="admin-header-left">
                        <img src="/logo.png" alt="MoniBook" className="admin-logo" />
                        <div className="admin-brand">
                            <h1 className="admin-brand-title">Moni Support</h1>
                            <span className="admin-brand-subtitle">Quản lý yêu cầu hỗ trợ</span>
                        </div>
                        <button onClick={onLogout} className="logout-button-header">
                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Đăng xuất
                        </button>
                    </div>

                    <div className="admin-search">
                        <svg className="admin-search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Tìm kiếm yêu cầu..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="admin-search-input"
                        />
                    </div>

                    <div className="admin-header-right">
                        <div className="admin-stats">
                            <div className="admin-stat admin-stat-open">
                                <span className="admin-stat-dot"></span>
                                <span>{openCount} Mở</span>
                            </div>
                            <div className="admin-stat admin-stat-closed">
                                <span>{closedCount} Đã đóng</span>
                            </div>
                        </div>
                        <div className="admin-avatar">A</div>
                    </div>
                </div>

                <div className="admin-tabs">
                    <button
                        onClick={() => setFilter('all')}
                        className={`admin-tab ${filter === 'all' ? 'active' : ''}`}
                    >
                        Tất cả
                        {filter === 'all' && <div className="admin-tab-active-bar"></div>}
                    </button>
                    <button
                        onClick={() => setFilter('open')}
                        className={`admin-tab ${filter === 'open' ? 'active' : ''}`}
                    >
                        Mở
                        {openCount > 0 && <span className="admin-tab-badge">{openCount}</span>}
                        {filter === 'open' && <div className="admin-tab-active-bar"></div>}
                    </button>
                    <button
                        onClick={() => setFilter('closed')}
                        className={`admin-tab ${filter === 'closed' ? 'active' : ''}`}
                    >
                        Đã đóng
                        {filter === 'closed' && <div className="admin-tab-active-bar"></div>}
                    </button>
                </div>
            </header>

            <div className="admin-main">
                <aside className="admin-sidebar">
                    <div className="admin-ticket-list">
                        <TicketList
                            tickets={displayedTickets}
                            selectedTicketId={selectedTicket?.id || null}
                            onSelectTicket={handleSelectTicket}
                            loading={loading}
                        />
                    </div>
                </aside>

                <main className="admin-content">
                    <ChatView
                        ticket={selectedTicket}
                        messages={messages}
                        loading={messagesLoading}
                        sending={sending}
                        onSendMessage={handleSendMessage}
                        onCloseTicket={handleClose}
                        onReopenTicket={handleReopen}
                    />
                </main>
            </div>
        </div>
    );
}