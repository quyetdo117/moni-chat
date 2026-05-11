import React, { useState, useRef, useEffect } from 'react';
import { SupportMessage, SupportTicket } from '../types';
import { ADMIN_SENDER_ID } from '../configs/constants';

interface ChatViewProps {
    ticket: SupportTicket | null;
    messages: SupportMessage[];
    loading: boolean;
    sending: boolean;
    onSendMessage: (text: string) => Promise<boolean>;
    onCloseTicket: () => void;
    onReopenTicket: () => void;
}

function formatTime(ts: number) {
    return new Date(ts * 1000).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
}

function formatDate(ts: number) {
    const d = new Date(ts * 1000);
    const today = new Date();
    const yest = new Date(today); yest.setDate(yest.getDate() - 1);
    if (d.toDateString() === today.toDateString()) return 'Hôm nay';
    if (d.toDateString() === yest.toDateString()) return 'Hôm qua';
    return d.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit' });
}

export default function ChatView({ ticket, messages, loading, sending, onSendMessage, onCloseTicket, onReopenTicket }: ChatViewProps) {
    const [text, setText] = useState('');
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => { if (endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

    const send = async () => {
        if (!text.trim() || sending) return;
        const t = text.trim();
        setText('');
        if (!await onSendMessage(t)) setText(t);
    };

    const onKey = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } };

    if (!ticket) return (
        <div className="chat-empty-wrap">
            <div className="chat-empty-illo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
            </div>
            <h3>Chọn yêu cầu hỗ trợ</h3>
            <p>Chọn một yêu cầu từ danh sách để bắt đầu trò chuyện</p>
        </div>
    );

    const msgsByDate: Record<string, SupportMessage[]> = {};
    messages.forEach(m => { const k = formatDate(m.createdAt); (msgsByDate[k] = msgsByDate[k] || []).push(m); });

    return (
        <div className="chat-wrap">
            <div className="chat-head">
                <div className="chat-head-l">
                    <h2>{ticket.title}</h2>
                    <div className="chat-head-m">
                        <span>{ticket.user_id.slice(0, 8)}...</span>
                        <span className={`chat-tag ${ticket.status}`}>{ticket.status === 'open' ? 'Mở' : 'Đã đóng'}</span>
                    </div>
                </div>
                <div className="chat-head-r">
                    {ticket.status === 'open' 
                        ? <button onClick={onCloseTicket} className="chat-btn-close">Đóng</button>
                        : <button onClick={onReopenTicket} className="chat-btn-open">Mở lại</button>
                    }
                </div>
            </div>

            <div className="chat-msgs">
                {loading ? <div className="chat-load"><span className="spinner"></span>Đang tải...</div> 
                : messages.length === 0 ? <div className="chat-no">Chưa có tin nhắn</div>
                : Object.entries(msgsByDate).map(([date, msgs]) => (
                    <div key={date}>
                        <div className="chat-date"><span>{date}</span></div>
                        {msgs.map(m => {
                            const isMe = m.sender_id === ADMIN_SENDER_ID;
                            return (
                                <div key={m.id} className={`chat-msg ${isMe ? 'me' : 'them'}`}>
                                    <div className="chat-bub"><p>{m.text}</p><time>{formatTime(m.createdAt)}</time></div>
                                </div>
                            );
                        })}
                    </div>
                ))}
                <div ref={endRef} />
            </div>

            {ticket.status === 'open' && (
                <div className="chat-foot">
                    <textarea value={text} onChange={e => setText(e.target.value)} onKeyDown={onKey} placeholder="Nhập tin nhắn..." rows={1} disabled={sending} className="chat-input" />
                    <button onClick={send} disabled={!text.trim() || sending} className="chat-send">{sending ? '...' : 'Gửi'}</button>
                </div>
            )}
        </div>
    );
}