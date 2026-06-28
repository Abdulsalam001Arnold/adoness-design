"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactElement } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import type { UIMessage, TextUIPart } from "ai";
import gsap from "gsap";

const transport = new DefaultChatTransport({ api: "/api/chat" });

const INITIAL_MESSAGES: UIMessage[] = [
  {
    id: "greeting",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Welcome to Adoness — making luxury fabric-art statements. How may I help you explore our collections today?",
      },
    ],
  },
];

function getMessageText(message: UIMessage): string {
  const text = message.parts
    .filter((part): part is TextUIPart => part.type === "text")
    .map((part) => part.text)
    .join("");
  const marker = text.indexOf("LEAD_CAPTURED::");
  return (marker >= 0 ? text.slice(0, marker) : text).trim();
}

export function Chatbot(): ReactElement {
  const [open, setOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const { messages, sendMessage, status, error } = useChat({
    transport,
    messages: INITIAL_MESSAGES,
  });

  const sending = status === "submitted" || status === "streaming";
  const awaitingReply = status === "submitted";

  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".chat-modal", {
        autoAlpha: 0,
        scale: 0.85,
        y: 16,
        transformOrigin: "bottom right",
      });
      gsap.set(".chat-header", { autoAlpha: 0, y: -8 });
      gsap.set(".chat-message", { autoAlpha: 0, y: 12 });
      gsap.set(".chat-input-bar", { autoAlpha: 0, y: 12 });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });
      tl.to(".chat-modal", {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 0.45,
      })
        .to(".chat-header", { autoAlpha: 1, y: 0, duration: 0.35 }, "-=0.2")
        .to(
          ".chat-message",
          { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.07 },
          "-=0.25"
        )
        .to(".chat-input-bar", { autoAlpha: 1, y: 0, duration: 0.35 }, "-=0.3");

      tlRef.current = tl;
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (open) tl.timeScale(1).play();
    else tl.timeScale(1.4).reverse();
  }, [open]);

  useEffect(() => {
    const el = messagesRef.current;
    if (!el || !open) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, open, status]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleSend = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const text = input.trim();
    if (!text || sending) return;
    setInput("");
    void sendMessage({ text });
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 md:bottom-8 md:right-8"
    >
      <div
        role="dialog"
        aria-label="Adoness Assistant"
        aria-hidden={!open}
        className="chat-modal invisible flex w-[min(92vw,400px)] flex-col overflow-hidden rounded-2xl border border-muted/30 bg-background opacity-0 shadow-[0_24px_60px_-15px_rgba(17,17,17,0.35)]"
      >
        <div className="chat-header flex items-center justify-between bg-foreground px-5 py-4 text-background">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em]">
              Adoness Assistant
            </span>
          </div>
          <button
            type="button"
            aria-label="Close assistant"
            onClick={() => setOpen(false)}
            className="text-background/70 transition-colors hover:text-background"
          >
            <CloseIcon />
          </button>
        </div>

        <div
          ref={messagesRef}
          className="flex max-h-[420px] min-h-[280px] flex-col gap-4 overflow-y-auto scroll-smooth px-5 py-5"
        >
          {messages.map((message) => {
            const text = getMessageText(message);
            if (text.length === 0) return null;
            return (
              <ChatBubble
                key={message.id}
                isUser={message.role === "user"}
                text={text}
              />
            );
          })}
          {awaitingReply ? <TypingBubble /> : null}
          {error ? (
            <p className="self-start text-[11px] text-accent">
              Something went wrong. Please try again.
            </p>
          ) : null}
        </div>

        <form
          onSubmit={handleSend}
          className="chat-input-bar border-t border-muted/30 bg-background/80 p-4"
        >
          <div className="relative flex items-center">
            <label htmlFor="chat-input" className="sr-only">
              Type your message
            </label>
            <input
              id="chat-input"
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Inquire here..."
              disabled={sending}
              className="w-full rounded-full border border-muted/40 bg-surface py-3 pl-5 pr-14 text-sm text-foreground placeholder:text-foreground/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60"
            />
            <button
              type="submit"
              aria-label={sending ? "Sending message" : "Send message"}
              aria-busy={sending}
              disabled={sending || input.trim().length === 0}
              className="absolute right-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-surface transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? <Spinner /> : <SendIcon />}
            </button>
          </div>
        </form>
      </div>

      <button
        type="button"
        aria-label={open ? "Close Adoness Assistant" : "Open Adoness Assistant"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-accent text-surface shadow-2xl transition-all duration-300 hover:scale-105 hover:opacity-90 active:scale-95 md:h-16 md:w-16"
      >
        {!open && (
          <span
            aria-hidden
            className="absolute inset-0 animate-ping rounded-full bg-accent/30"
          />
        )}
        <span className="relative">{open ? <CloseIcon /> : <ChatIcon />}</span>
      </button>
    </div>
  );
}

function ChatBubble({
  isUser,
  text,
}: {
  isUser: boolean;
  text: string;
}): ReactElement {
  return (
    <div
      className={`chat-message flex max-w-[85%] flex-col ${
        isUser ? "items-end self-end" : "items-start self-start"
      }`}
    >
      <div
        className={`px-4 py-3 text-sm leading-relaxed shadow-sm ${
          isUser
            ? "rounded-2xl rounded-tr-sm bg-foreground text-background"
            : "rounded-2xl rounded-tl-sm bg-muted/30 text-foreground"
        }`}
      >
        {text}
      </div>
      <span
        className={`mt-1 text-[10px] uppercase tracking-[0.2em] text-foreground/40 ${
          isUser ? "mr-2" : "ml-2"
        }`}
      >
        {isUser ? "You" : "Assistant"}
      </span>
    </div>
  );
}

function TypingBubble(): ReactElement {
  return (
    <div className="chat-message flex max-w-[85%] flex-col items-start self-start">
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-muted/30 px-4 py-3 shadow-sm">
        <span className="block h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/50 [animation-delay:-0.3s]" />
        <span className="block h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/50 [animation-delay:-0.15s]" />
        <span className="block h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/50" />
      </div>
      <span className="mt-1 ml-2 text-[10px] uppercase tracking-[0.2em] text-foreground/40">
        Assistant · typing
      </span>
    </div>
  );
}

function Spinner(): ReactElement {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="animate-spin"
      aria-hidden
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function ChatIcon(): ReactElement {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function CloseIcon(): ReactElement {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

function SendIcon(): ReactElement {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
