'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { formatDate } from '@/lib/utils';
import { Mail, Inbox, Loader2, AlertCircle } from 'lucide-react';

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Message | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setMessages(data ?? []);
      }
      setLoading(false);
    };

    fetchMessages();
  }, []);

  const markAsRead = async (id: string) => {
    await supabase.from('contact_messages').update({ read: true }).eq('id', id);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  return (
    <div className="min-h-screen pt-16 p-4 sm:p-8">
      <div className="container-max max-w-5xl">
        <div className="flex items-center gap-3 mb-8">
          <Inbox className="w-6 h-6 text-primary" aria-hidden="true" />
          <h1 className="text-2xl font-bold text-foreground">Messages</h1>
          {messages.filter((m) => !m.read).length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-bold">
              {messages.filter((m) => !m.read).length} unread
            </span>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" aria-hidden="true" />
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive" role="alert">
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
            <span className="text-sm">{error}</span>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-20">
            <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" aria-hidden="true" />
            <p className="text-muted-foreground">No messages yet. Share your contact form link!</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* List */}
            <div className="space-y-3">
              {messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => {
                    setSelected(msg);
                    if (!msg.read) markAsRead(msg.id);
                  }}
                  className={`w-full text-left glass rounded-xl border p-4 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    selected?.id === msg.id
                      ? 'border-primary/50 bg-primary/5'
                      : msg.read
                      ? 'border-white/10 hover:border-primary/30'
                      : 'border-primary/30 bg-primary/5 hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className={`text-sm font-semibold ${msg.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                      {msg.name}
                    </p>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className={`text-sm ${msg.read ? 'text-muted-foreground' : 'text-foreground font-medium'} truncate mb-1`}>
                    {msg.subject}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{msg.message}</p>
                </button>
              ))}
            </div>

            {/* Detail */}
            {selected ? (
              <div className="glass rounded-2xl border border-white/10 p-6">
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-foreground mb-1">{selected.subject}</h2>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>From: <span className="text-foreground">{selected.name}</span></p>
                    <p>Email: <a href={`mailto:${selected.email}`} className="text-primary hover:underline">{selected.email}</a></p>
                    <p>Received: {formatDate(selected.created_at)}</p>
                  </div>
                </div>
                <div className="border-t border-border/50 pt-4">
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">{selected.message}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="glass rounded-2xl border border-white/10 p-6 flex items-center justify-center">
                <p className="text-muted-foreground text-sm">Select a message to read it.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
