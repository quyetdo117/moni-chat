import {
    collection,
    query,
    where,
    orderBy,
    onSnapshot,
    updateDoc,
    doc,
    getDoc,
    getDocs,
    Timestamp,
    writeBatch,
} from 'firebase/firestore';
import { db, functions } from '../configs/firebase';
import { TABLES_NAME, ADMIN_SENDER_ID } from '../configs/constants';
import { SupportTicket, SupportMessage } from '../types';
import { httpsCallable } from 'firebase/functions';

// ==================== TICKET SERVICES ====================

/**
 * Subscribe to all open tickets (real-time)
 */
export const subscribeToOpenTickets = (callback: (tickets: SupportTicket[]) => void) => {
    const q = query(
        collection(db, TABLES_NAME.SUPPORT_TICKETS),
        where('status', '==', 'open'),
        orderBy('updatedAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
        const tickets: SupportTicket[] = [];
        snapshot.forEach((doc) => {
            tickets.push({ id: doc.id, ...doc.data() } as SupportTicket);
        });
        callback(tickets);
    });
};

/**
 * Subscribe to all closed tickets (real-time)
 */
export const subscribeToClosedTickets = (callback: (tickets: SupportTicket[]) => void) => {
    const q = query(
        collection(db, TABLES_NAME.SUPPORT_TICKETS),
        where('status', '==', 'closed'),
        orderBy('updatedAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
        const tickets: SupportTicket[] = [];
        snapshot.forEach((doc) => {
            tickets.push({ id: doc.id, ...doc.data() } as SupportTicket);
        });
        callback(tickets);
    });
};

/**
 * Subscribe to all tickets (real-time)
 */
export const subscribeToAllTickets = (callback: (tickets: SupportTicket[]) => void) => {
    const q = query(
        collection(db, TABLES_NAME.SUPPORT_TICKETS),
        orderBy('updatedAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
        const tickets: SupportTicket[] = [];
        snapshot.forEach((doc) => {
            tickets.push({ id: doc.id, ...doc.data() } as SupportTicket);
        });
        callback(tickets);
    });
};

/**
 * Close a ticket
 */
export const closeTicket = async (ticketId: string): Promise<boolean> => {
    try {
        const ticketRef = doc(db, TABLES_NAME.SUPPORT_TICKETS, ticketId);
        await updateDoc(ticketRef, {
            status: 'closed',
            updatedAt: Timestamp.now().seconds,
        });
        return true;
    } catch (error) {
        console.error('Error closing ticket:', error);
        return false;
    }
};

/**
 * Reopen a ticket
 */
export const reopenTicket = async (ticketId: string): Promise<boolean> => {
    try {
        const ticketRef = doc(db, TABLES_NAME.SUPPORT_TICKETS, ticketId);
        await updateDoc(ticketRef, {
            status: 'open',
            updatedAt: Timestamp.now().seconds,
        });
        return true;
    } catch (error) {
        console.error('Error reopening ticket:', error);
        return false;
    }
};

/**
 * Mark ticket as read (reset unread count)
 */
export const markTicketAsRead = async (ticketId: string): Promise<boolean> => {
    try {
        const ticketRef = doc(db, TABLES_NAME.SUPPORT_TICKETS, ticketId);
        await updateDoc(ticketRef, {
            unread_count: 0,
        });
        return true;
    } catch (error) {
        console.error('Error marking ticket as read:', error);
        return false;
    }
};

// ==================== MESSAGE SERVICES ====================

/**
 * Subscribe to messages for a specific ticket (real-time)
 */
export const subscribeToMessages = (
    ticketId: string,
    callback: (messages: SupportMessage[]) => void
) => {
    const q = query(
        collection(db, TABLES_NAME.SUPPORT_MESSAGES),
        where('ticket_id', '==', ticketId),
        orderBy('createdAt', 'asc')
    );

    return onSnapshot(q, (snapshot) => {
        const messages: SupportMessage[] = [];
        snapshot.forEach((doc) => {
            messages.push({ id: doc.id, ...doc.data() } as SupportMessage);
        });
        callback(messages);
    });
};

/**
 * Send a message as admin
 */
export const sendAdminMessage = async (
    ticketId: string,
    userId: string,
    text: string
): Promise<boolean> => {
    try {
        const body = {
            ticket_id: ticketId,
            user_id: userId,
            text
        }
        const cloudFn = httpsCallable(functions, 'sendSupportMessageAsAdmin');
        await cloudFn(body);
        return true;
    } catch (error) {
        console.error('Error sending admin message:', error);
        return false;
    }
};

/**
 * Get ticket by ID
 */
export const getTicketById = async (ticketId: string): Promise<SupportTicket | null> => {
    try {
        const ticketRef = doc(db, TABLES_NAME.SUPPORT_TICKETS, ticketId);
        const ticketSnap = await getDoc(ticketRef);

        if (ticketSnap.exists()) {
            return { id: ticketSnap.id, ...ticketSnap.data() } as SupportTicket;
        }
        return null;
    } catch (error) {
        console.error('Error getting ticket:', error);
        return null;
    }
};

/**
 * Search tickets by title
 */
export const searchTickets = async (searchTerm: string): Promise<SupportTicket[]> => {
    try {
        // Firestore doesn't support full-text search, so we fetch and filter
        // For production, consider using Algolia or similar
        const q = query(
            collection(db, TABLES_NAME.SUPPORT_TICKETS),
            orderBy('updatedAt', 'desc')
        );

        const snapshot = await getDocs(q);
        const tickets: SupportTicket[] = [];
        const lowerSearch = searchTerm.toLowerCase();

        snapshot.forEach((doc) => {
            const data = doc.data() as SupportTicket;
            if (data.title.toLowerCase().includes(lowerSearch) || data.user_id.toLowerCase().includes(lowerSearch)) {
                tickets.push({ ...data });
            }
        });

        return tickets;
    } catch (error) {
        console.error('Error searching tickets:', error);
        return [];
    }
};