"use client";

import { useState, useEffect } from "react";
import { getAllContacts, deleteContact, replyToContact } from "@/lib/action/contact_action";
import { Mail, Trash2, Send, CheckCircle, XCircle, Clock, Phone, User, Search } from "lucide-react";

interface Contact {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    replied: boolean;
    reply_message?: string;
    createdAt: string;
    updatedAt: string;
}

export default function AdminContactsPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [replyText, setReplyText] = useState("");
    const [actionLoading, setActionLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getAllContacts();
            if (result.success) {
                const contactsData = result.data || [];
                setContacts(contactsData);
                // Auto-select first contact if none selected
                if (!selectedContact && contactsData.length > 0) {
                    setSelectedContact(contactsData[0]);
                }
            } else {
                setError(result.message);
            }
        } catch (err: any) {
            setError(err.message || "Failed to fetch contacts");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this conversation?")) {
            return;
        }

        setActionLoading(true);
        try {
            const result = await deleteContact(id);
            if (result.success) {
                setSuccessMessage("Conversation deleted successfully");
                setSelectedContact(null);
                fetchContacts();
                setTimeout(() => setSuccessMessage(null), 3000);
            } else {
                setError(result.message);
            }
        } catch (err: any) {
            setError(err.message || "Failed to delete conversation");
        } finally {
            setActionLoading(false);
        }
    };

    const handleSendReply = async () => {
        if (!selectedContact || !replyText.trim()) {
            setError("Please type a message");
            return;
        }

        setActionLoading(true);
        try {
            const result = await replyToContact(selectedContact._id, replyText);
            if (result.success) {
                setSuccessMessage("Reply sent successfully");
                setReplyText("");
                // Update the selected contact with the reply
                const updatedContact = {
                    ...selectedContact,
                    replied: true,
                    reply_message: replyText,
                };
                setSelectedContact(updatedContact);
                fetchContacts();
                setTimeout(() => setSuccessMessage(null), 3000);
            } else {
                setError(result.message);
            }
        } catch (err: any) {
            setError(err.message || "Failed to send reply");
        } finally {
            setActionLoading(false);
        }
    };

    const selectContact = (contact: Contact) => {
        setSelectedContact(contact);
        setReplyText("");
        setError(null);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatFullDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-140px)] flex bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Conversations List - Left Sidebar */}
            <div className="w-80 border-r border-gray-200 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Mail className="h-6 w-6 text-purple-600" />
                        Inbox
                    </h1>
                    
                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        />
                    </div>

                    {/* Stats */}
                    <div className="flex gap-2 mt-3 text-xs">
                        <span className="px-2 py-1 bg-gray-100 rounded">
                            Total: {contacts.length}
                        </span>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">
                            Pending: {contacts.filter((c) => !c.replied).length}
                        </span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                            Replied: {contacts.filter((c) => c.replied).length}
                        </span>
                    </div>
                </div>

                {/* Conversations List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredContacts.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            <Mail className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                            <p className="text-sm">No messages found</p>
                        </div>
                    ) : (
                        filteredContacts.map((contact) => (
                            <div
                                key={contact._id}
                                onClick={() => selectContact(contact)}
                                className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${
                                    selectedContact?._id === contact._id
                                        ? "bg-purple-50 border-l-4 border-l-purple-600"
                                        : contact.replied
                                        ? "bg-white"
                                        : "bg-yellow-50/30"
                                }`}
                            >
                                <div className="flex items-start justify-between mb-1">
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                                            <User className="h-5 w-5 text-purple-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-semibold text-gray-900 truncate">
                                                {contact.name}
                                            </h3>
                                            <p className="text-xs text-gray-500 truncate">
                                                {contact.email}
                                            </p>
                                        </div>
                                    </div>
                                    {contact.replied ? (
                                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                                    ) : (
                                        <Clock className="h-4 w-4 text-yellow-500 shrink-0" />
                                    )}
                                </div>
                                <p className="text-xs font-medium text-gray-700 truncate mb-1">
                                    {contact.subject}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    {contact.message}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                    {formatDate(contact.createdAt)}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Area - Right Side */}
            {selectedContact ? (
                <div className="flex-1 flex flex-col">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-200 bg-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                                    <User className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        {selectedContact.name}
                                    </h2>
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Mail className="h-3 w-3" />
                                            {selectedContact.email}
                                        </span>
                                        {selectedContact.phone && (
                                            <span className="flex items-center gap-1">
                                                <Phone className="h-3 w-3" />
                                                {selectedContact.phone}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(selectedContact._id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                disabled={actionLoading}
                            >
                                <Trash2 className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-4">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                                <XCircle className="h-5 w-5" />
                                {error}
                            </div>
                        )}

                        {successMessage && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
                                <CheckCircle className="h-5 w-5" />
                                {successMessage}
                            </div>
                        )}

                        {/* Customer Message */}
                        <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center shrink-0">
                                <User className="h-4 w-4 text-gray-600" />
                            </div>
                            <div className="flex-1">
                                <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm border border-gray-200">
                                    <p className="text-sm font-semibold text-gray-900 mb-1">
                                        {selectedContact.subject}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        {selectedContact.message}
                                    </p>
                                </div>
                                <p className="text-xs text-gray-500 mt-1 ml-2">
                                    {formatFullDate(selectedContact.createdAt)}
                                </p>
                            </div>
                        </div>

                        {/* Admin Reply */}
                        {selectedContact.replied && selectedContact.reply_message && (
                            <div className="flex items-start gap-3 justify-end">
                                <div className="flex-1 flex flex-col items-end">
                                    <div className="bg-purple-600 text-white rounded-2xl rounded-tr-none p-4 shadow-sm max-w-lg">
                                        <p className="text-sm">
                                            {selectedContact.reply_message}
                                        </p>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1 mr-2">
                                        {formatFullDate(selectedContact.updatedAt)}
                                    </p>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center shrink-0">
                                    <span className="text-white text-xs font-semibold">A</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Reply Input Area */}
                    {!selectedContact.replied && (
                        <div className="p-4 bg-white border-t border-gray-200">
                            <div className="flex items-end gap-3">
                                <textarea
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    placeholder="Type your reply..."
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                    rows={3}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            if (replyText.trim()) {
                                                handleSendReply();
                                            }
                                        }
                                    }}
                                />
                                <button
                                    onClick={handleSendReply}
                                    disabled={actionLoading || !replyText.trim()}
                                    className="px-6 py-3 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {actionLoading ? (
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    ) : (
                                        <>
                                            <Send className="h-5 w-5" />
                                            Send
                                        </>
                                    )}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                Press Enter to send, Shift+Enter for new line
                            </p>
                        </div>
                    )}

                    {selectedContact.replied && (
                        <div className="p-4 bg-green-50 border-t border-green-200">
                            <p className="text-sm text-green-700 text-center flex items-center justify-center gap-2">
                                <CheckCircle className="h-4 w-4" />
                                You have already replied to this message
                            </p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                    <div className="text-center text-gray-400">
                        <Mail className="h-16 w-16 mx-auto mb-4" />
                        <p className="text-lg font-medium">Select a conversation</p>
                        <p className="text-sm">Choose a message from the inbox to view and reply</p>
                    </div>
                </div>
            )}
        </div>
    );
}
