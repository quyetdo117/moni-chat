import { useState, useEffect, useCallback, useRef } from 'react';
import { SupportMessage } from '../types';
import {
    subscribeToMessages,
    sendAdminMessage,
    markTicketAsRead,
} from '../services/firestore.service';

export function useChat(ticketId: string, userId: string) {
    const [messages, setMessages] = useState<SupportMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const unsubscribeRef = useRef<(() => void) | null>(null);

    // Subscribe to messages
    useEffect(() => {
        if (!ticketId) return;

        setLoading(true);

        // Mark ticket as read when opening
        markTicketAsRead(ticketId);

        // Subscribe to real-time messages
        unsubscribeRef.current = subscribeToMessages(ticketId, (msgs) => {
            setMessages(msgs);
            setLoading(false);
        });

        return () => {
            if (unsubscribeRef.current) {
                unsubscribeRef.current();
            }
        };
    }, [ticketId]);

    // Send message as admin
    const handleSendMessage = useCallback(async (text: string) => {
        if (!text.trim() || sending || !ticketId || !userId) return false;

        setSending(true);

        const success = await sendAdminMessage(ticketId, userId, text.trim());

        setSending(false);
        return success;
    }, [ticketId, userId, sending]);

    return {
        messages,
        loading,
        sending,
        handleSendMessage,
    };
}