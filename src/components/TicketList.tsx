import React from 'react';
import { SupportTicket } from '../types';

interface TicketListProps {
    tickets: SupportTicket[];
    selectedTicketId: string | null;
    onSelectTicket: (ticket: SupportTicket) => void;
    loading: boolean;
}

function formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins}p trước`;
    if (diffHours < 24) return `${diffHours}h trước`;
    if (diffDays < 7) return `${diffDays}ngày trước`;

    return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
    });
}

export default function TicketList({
    tickets,
    selectedTicketId,
    onSelectTicket,
    loading,
}: TicketListProps) {
    if (loading) {
        return (
            <div className="ticket-loading">
                <div className="ticket-spinner"></div>
                <p>Đang tải yêu cầu...</p>
            </div>
        );
    }

    if (tickets.length === 0) {
        return (
            <div className="ticket-empty">
                <div className="ticket-empty-icon">
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                </div>
                <p>Không có yêu cầu nào</p>
            </div>
        );
    }

    return (
        <div className="ticket-list">
            {tickets.map((ticket) => {
                const isSelected = ticket.id === selectedTicketId;
                const isUnread = ticket.unread_count > 0;

                return (
                    <div
                        key={ticket.id}
                        onClick={() => onSelectTicket(ticket)}
                        className={`ticket-item ${isSelected ? 'selected' : ''} ${isUnread && !isSelected ? 'unread' : ''}`}
                    >
                        <div className="ticket-item-header">
                            <h3 className="ticket-item-title">{ticket.title}</h3>
                            {isUnread && (
                                <span className="ticket-item-badge">{ticket.unread_count}</span>
                            )}
                        </div>

                        <p className="ticket-item-message">
                            {ticket.last_message || 'Chưa có tin nhắn'}
                        </p>

                        <div className="ticket-item-footer">
                            <span className={`ticket-item-status ${ticket.status === 'open' ? 'ticket-item-status-open' : 'ticket-item-status-closed'}`}>
                                {ticket.status === 'open' ? '● Mở' : '○ Đã đóng'}
                            </span>
                            <div className="ticket-item-meta">
                                <span className="ticket-item-user">{ticket.user_id.slice(0, 6)}...</span>
                                <span>{formatTimestamp(ticket.updatedAt)}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}