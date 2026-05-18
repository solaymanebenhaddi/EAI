'use client';

import { useState, useMemo } from 'react';
import { createAgentChat } from '@21st-sdk/nextjs';
import { useChat } from '@ai-sdk/react';
import { AgentChat } from '@21st-sdk/react';
import '@21st-sdk/react/styles.css';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function BIMAssistantChat() {
  const [isOpen, setIsOpen] = useState(false);

  const chat = useMemo(
    () =>
      createAgentChat({
        agent: 'bim-assistant',
        tokenUrl: '/api/agent/token',
      }),
    []
  );

  const { messages, sendMessage, status, stop, error } = useChat({
    chat,
  });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .elaouad-custom-chat .an-root {
          --an-background: #F8F5EE;
          --an-background-secondary: #EFECE3;
          --an-background-tertiary: #E5E2D8;
          --an-foreground: #080806;
          --an-foreground-muted: #68645C;
          --an-border-color: #DCD8CD;
          --an-border-color-light: #EFECE3;
          --an-primary-color: #C5A880;
          --an-user-message-bg: #EFECE3;
          --an-user-message-text: #080806;
          --an-send-button-bg: #C5A880;
          --an-send-button-color: #080806;
          --an-input-background: #F8F5EE;
          --an-input-border-color: #DCD8CD;
          --an-input-color: #080806;
          --an-font-family: var(--font-display, sans-serif);
          --an-border-radius: 16px;
        }

        .dark .elaouad-custom-chat .an-root {
          --an-background: #080806;
          --an-background-secondary: #181816;
          --an-background-tertiary: #222220;
          --an-foreground: #F8F5EE;
          --an-foreground-muted: #9E9A90;
          --an-border-color: #2E2E2C;
          --an-border-color-light: #181816;
          --an-primary-color: #C5A880;
          --an-user-message-bg: #181816;
          --an-user-message-text: #F8F5EE;
          --an-send-button-bg: #C5A880;
          --an-send-button-color: #080806;
          --an-input-background: #080806;
          --an-input-border-color: #2E2E2C;
          --an-input-color: #F8F5EE;
        }
      ` }} />

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 bg-brass text-void p-4 rounded-full shadow-2xl hover:bg-brass-glow transition-all duration-300 group"
        aria-label="Ouvrir l'assistant BIM"
      >
        <MessageCircle size={28} />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-stone text-mortar px-3 py-2 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Assistant BIM
        </span>
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-8 w-[420px] h-[560px] max-w-[calc(100vw-32px)] bg-lumen border border-cloud rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden elaouad-custom-chat"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-lumen border-b border-cloud dark:bg-void dark:border-stone/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brass/20 rounded-full flex items-center justify-center">
                  <MessageCircle size={20} className="text-brass" />
                </div>
                <div>
                  <h3 className="font-display text-ink dark:text-lumen text-lg font-semibold">Assistant BIM</h3>
                  <p className="font-body text-[10px] text-mortar dark:text-stone uppercase tracking-wider">ELAOUAD Architecture</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-mortar hover:text-ink dark:text-stone dark:hover:text-lumen transition-colors p-1"
                aria-label="Fermer le chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* AgentChat Component */}
            <div className="flex-1 overflow-hidden">
              <AgentChat
                messages={messages}
                onSend={(message) =>
                  sendMessage({
                    role: 'user',
                    parts: [{ type: 'text', text: message.content }],
                  })
                }
                status={status}
                onStop={stop}
                error={error ?? undefined}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default BIMAssistantChat;