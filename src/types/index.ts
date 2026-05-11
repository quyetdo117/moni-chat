export interface SupportTicket {
    id: string;
    title: string;
    user_id: string;
    status: 'open' | 'closed';
    last_message: string;
    unread_count: number;
    createdAt: number;
    updatedAt: number;
}

export interface SupportMessage {
    id: string;
    ticket_id: string;
    user_id: string;
    sender_id: string; // 'admin' or user_id
    text: string;
    createdAt: number;
}