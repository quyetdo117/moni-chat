import { useState, useEffect, useCallback } from 'react';
import { SupportTicket } from '../types';
import {
    subscribeToAllTickets,
    searchTickets,
    closeTicket,
    reopenTicket,
    markTicketAsRead,
} from '../services/firestore.service';

export type TicketFilter = 'all' | 'open' | 'closed';

export function useTickets() {
    const [tickets, setTickets] = useState<SupportTicket[]>([]);
    const [filteredTickets, setFilteredTickets] = useState<SupportTicket[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<TicketFilter>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<SupportTicket[] | null>(null);

    // Subscribe to real-time updates
    useEffect(() => {
        setLoading(true);
        const unsubscribe = subscribeToAllTickets((allTickets) => {
            setTickets(allTickets);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Filter tickets based on current filter
    useEffect(() => {
        if (searchResults !== null) {
            return; // Don't filter if searching
        }

        let filtered = [...tickets];

        if (filter === 'open') {
            filtered = filtered.filter((t) => t.status === 'open');
        } else if (filter === 'closed') {
            filtered = filtered.filter((t) => t.status === 'closed');
        }

        setFilteredTickets(filtered);
    }, [tickets, filter, searchResults]);

    // Handle search
    const handleSearch = useCallback(async (term: string) => {
        setSearchTerm(term);

        if (!term.trim()) {
            setSearchResults(null);
            return;
        }

        const results = await searchTickets(term);
        setSearchResults(results);
    }, []);

    // Clear search
    const clearSearch = useCallback(() => {
        setSearchTerm('');
        setSearchResults(null);
    }, []);

    // Filter actions
    const handleFilterChange = useCallback((newFilter: TicketFilter) => {
        setFilter(newFilter);
    }, []);

    // Ticket actions
    const handleCloseTicket = useCallback(async (ticketId: string) => {
        const success = await closeTicket(ticketId);
        return success;
    }, []);

    const handleReopenTicket = useCallback(async (ticketId: string) => {
        const success = await reopenTicket(ticketId);
        return success;
    }, []);

    const handleMarkAsRead = useCallback(async (ticketId: string) => {
        const success = await markTicketAsRead(ticketId);
        return success;
    }, []);

    // Get counts
    const openCount = tickets.filter((t) => t.status === 'open').length;
    const closedCount = tickets.filter((t) => t.status === 'closed').length;

    // Display tickets (search results or filtered)
    const displayTickets = searchResults !== null ? searchResults : filteredTickets;

    return {
        tickets: displayTickets,
        allTickets: tickets,
        loading,
        filter,
        searchTerm,
        openCount,
        closedCount,
        handleFilterChange,
        handleSearch,
        clearSearch,
        handleCloseTicket,
        handleReopenTicket,
        handleMarkAsRead,
    };
}