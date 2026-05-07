import type { ReactElement } from "react";

export function Chatbot(): ReactElement {
  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100]">
      <button
        type="button"
        aria-label="Open Adoness Assistant"
        className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-foreground text-background shadow-2xl transition-all duration-300 hover:bg-accent hover:scale-105 active:scale-95"
      >
        <ChatIcon />
      </button>
    </div>
  );
}

function ChatIcon(): ReactElement {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}
