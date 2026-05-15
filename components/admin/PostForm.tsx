"use client";

import { useRef, useState } from "react";
import type {
  ChangeEvent,
  DragEvent,
  FormEvent,
  ReactElement,
  ReactNode,
} from "react";
import { Button } from "@/components/ui/Button";
import {
  ARRIVAL_CATEGORIES,
  type ArrivalCategory,
  type ArrivalItem,
} from "@/types/arrival";

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

interface PostFormProps {
  initiallyUnlocked: boolean;
}

interface FormState {
  name: string;
  category: ArrivalCategory;
  price: string;
  description: string;
}

const INITIAL_FORM: FormState = {
  name: "",
  category: "Dresses",
  price: "",
  description: "",
};

interface CloudinarySignaturePayload {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  folder: string;
  signature: string;
}

interface CloudinaryUploadResult {
  secure_url: string;
}

type Status =
  | { kind: "idle" }
  | { kind: "uploading"; progress: number }
  | { kind: "saving" }
  | { kind: "success"; item: ArrivalItem }
  | { kind: "error"; message: string };

export function PostForm({ initiallyUnlocked }: PostFormProps): ReactElement {
  const [pin, setPin] = useState<string>("");
  const [unlocked, setUnlocked] = useState<boolean>(initiallyUnlocked);
  const [unlocking, setUnlocking] = useState<boolean>(false);
  const [unlockError, setUnlockError] = useState<string | null>(null);
  const [locking, setLocking] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [fileState, setFileState] = useState<{
    file: File;
    previewUrl: string;
  } | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const file = fileState?.file ?? null;
  const previewUrl = fileState?.previewUrl ?? null;

  const replaceFile = (next: File | null): void => {
    setFileState((prev) => {
      if (prev) URL.revokeObjectURL(prev.previewUrl);
      if (!next) return null;
      return { file: next, previewUrl: URL.createObjectURL(next) };
    });
  };

  const handleUnlock = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const candidate = pin.trim();
    if (candidate.length === 0 || unlocking) return;

    setUnlocking(true);
    setUnlockError(null);

    try {
      const response = await fetch("/api/admin/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: candidate }),
      });

      if (response.status === 401) {
        setUnlockError("Incorrect PIN. Try again.");
        setPin("");
        return;
      }

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        setUnlockError(
          payload?.error ?? `Sign-in failed (${response.status}).`
        );
        return;
      }

      setPin("");
      setUnlocked(true);
    } catch {
      setUnlockError("Network error. Please try again.");
    } finally {
      setUnlocking(false);
    }
  };

  const handleLock = async (): Promise<void> => {
    if (locking) return;
    setLocking(true);
    try {
      await fetch("/api/admin/lock", { method: "POST" });
    } catch {
      // Even if the network blip prevents the server response, clear local
      // state so the UI re-gates immediately; the cookie expires on its own.
    } finally {
      setPin("");
      setUnlocked(false);
      setStatus({ kind: "idle" });
      setLocking(false);
    }
  };

  const updateField = <K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ): void => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validateAndSetFile = (incoming: File | null): void => {
    if (!incoming) {
      replaceFile(null);
      return;
    }
    if (!ACCEPTED_TYPES.includes(incoming.type)) {
      setStatus({
        kind: "error",
        message: "Unsupported file type. Use JPG, PNG, WebP, or AVIF.",
      });
      return;
    }
    if (incoming.size > MAX_FILE_BYTES) {
      setStatus({
        kind: "error",
        message: "Image is over 10MB. Pick a smaller file or compress it first.",
      });
      return;
    }
    setStatus({ kind: "idle" });
    replaceFile(incoming);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setDragActive(false);
    const dropped = event.dataTransfer.files?.[0];
    if (dropped) validateAndSetFile(dropped);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    if (!dragActive) setDragActive(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setDragActive(false);
  };

  const fetchSignature = async (): Promise<CloudinarySignaturePayload> => {
    const response = await fetch("/api/upload-sign", { method: "POST" });
    const payload = (await response.json()) as
      | CloudinarySignaturePayload
      | { error: string };
    if (!response.ok) {
      const message =
        "error" in payload ? payload.error : `Sign request failed (${response.status}).`;
      if (response.status === 401) {
        setUnlocked(false);
        setUnlockError("Your session expired. Please sign in again.");
      }
      throw new Error(message);
    }
    if (!("signature" in payload)) {
      throw new Error("Unexpected signature response.");
    }
    return payload;
  };

  const uploadToCloudinary = (
    upload: File,
    sig: CloudinarySignaturePayload,
    onProgress: (percent: number) => void
  ): Promise<CloudinaryUploadResult> =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`;
      const data = new FormData();
      data.append("file", upload);
      data.append("api_key", sig.apiKey);
      data.append("timestamp", String(sig.timestamp));
      data.append("signature", sig.signature);
      data.append("folder", sig.folder);

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          onProgress(Math.round((event.loaded / event.total) * 100));
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const parsed = JSON.parse(xhr.responseText) as CloudinaryUploadResult;
            if (typeof parsed.secure_url !== "string") {
              reject(new Error("Cloudinary response missing secure_url."));
              return;
            }
            resolve(parsed);
          } catch {
            reject(new Error("Could not parse Cloudinary response."));
          }
          return;
        }
        try {
          const parsed = JSON.parse(xhr.responseText) as {
            error?: { message?: string };
          };
          reject(new Error(parsed.error?.message ?? `Cloudinary upload failed (${xhr.status}).`));
        } catch {
          reject(new Error(`Cloudinary upload failed (${xhr.status}).`));
        }
      });

      xhr.addEventListener("error", () => {
        reject(new Error("Network error during upload."));
      });
      xhr.addEventListener("abort", () => {
        reject(new Error("Upload aborted."));
      });

      xhr.open("POST", url);
      xhr.send(data);
    });

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!file) {
      setStatus({ kind: "error", message: "Please choose an image to upload." });
      return;
    }

    const priceNum = Number(form.price);
    if (!Number.isFinite(priceNum) || priceNum < 0) {
      setStatus({ kind: "error", message: "Price must be a non-negative number." });
      return;
    }

    try {
      setStatus({ kind: "uploading", progress: 0 });
      const signature = await fetchSignature();
      const uploaded = await uploadToCloudinary(file, signature, (percent) => {
        setStatus({ kind: "uploading", progress: percent });
      });

      setStatus({ kind: "saving" });
      const response = await fetch("/api/arrivals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          category: form.category,
          price: priceNum,
          image: uploaded.secure_url,
          description: form.description.trim() || null,
        }),
      });

      const payload = (await response.json()) as
        | { item: ArrivalItem }
        | { error: string };

      if (!response.ok) {
        const message =
          "error" in payload ? payload.error : `Request failed (${response.status}).`;
        if (response.status === 401) {
          setUnlocked(false);
          setUnlockError("Your session expired. Please sign in again.");
        }
        setStatus({ kind: "error", message });
        return;
      }

      if (!("item" in payload)) {
        setStatus({ kind: "error", message: "Unexpected response from server." });
        return;
      }

      setStatus({ kind: "success", item: payload.item });
      setForm(INITIAL_FORM);
      replaceFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";
      setStatus({ kind: "error", message });
    }
  };

  if (!unlocked) {
    return (
      <form
        onSubmit={handleUnlock}
        className="flex flex-col gap-5 rounded-3xl border border-foreground/10 bg-surface p-8 shadow-[0_24px_60px_-30px_rgba(17,17,17,0.25)] md:p-10"
      >
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            Restricted
          </span>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Admin Access
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">
            Enter the studio PIN to post new arrivals.
          </p>
        </div>
        <label className="flex flex-col gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground/60">
            PIN
          </span>
          <input
            type="password"
            autoComplete="current-password"
            value={pin}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setPin(event.target.value);
              if (unlockError) setUnlockError(null);
            }}
            disabled={unlocking}
            className="rounded-full border border-muted/60 bg-background px-6 py-3.5 text-sm tracking-[0.1em] text-foreground placeholder:text-foreground/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60"
            placeholder="••••••"
            required
          />
        </label>
        {unlockError ? (
          <p
            role="alert"
            aria-live="polite"
            className="text-sm leading-relaxed text-red-700"
          >
            {unlockError}
          </p>
        ) : null}
        <Button
          type="submit"
          size="md"
          className="self-start"
          disabled={unlocking || pin.trim().length === 0}
          aria-busy={unlocking}
        >
          {unlocking ? "Verifying…" : "Unlock"}
        </Button>
      </form>
    );
  }

  const busy = status.kind === "uploading" || status.kind === "saving";
  const uploadPercent = status.kind === "uploading" ? status.progress : 0;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 rounded-3xl border border-foreground/10 bg-surface p-8 shadow-[0_24px_60px_-30px_rgba(17,17,17,0.25)] md:p-10"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            Studio
          </span>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Post a New Arrival
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">
            Drop an image, fill in the details, and the piece will appear on the
            New Arrivals page immediately.
          </p>
        </div>
        <button
          type="button"
          onClick={handleLock}
          disabled={locking}
          aria-busy={locking}
          className="text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground/50 transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {locking ? "Locking…" : "Lock"}
        </button>
      </div>

      <Field label="Name" htmlFor="arrival-name">
        <input
          id="arrival-name"
          type="text"
          required
          maxLength={120}
          value={form.name}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updateField("name", event.target.value)
          }
          className={inputClass}
          placeholder="Aurelia Silk Slip Dress"
        />
      </Field>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field label="Category" htmlFor="arrival-category">
          <select
            id="arrival-category"
            value={form.category}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              updateField("category", event.target.value as ArrivalCategory)
            }
            className={`${inputClass} appearance-none bg-[length:16px] bg-[right_1.25rem_center] bg-no-repeat pr-12`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23111111' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")",
            }}
          >
            {ARRIVAL_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Price (USD)" htmlFor="arrival-price">
          <input
            id="arrival-price"
            type="number"
            inputMode="decimal"
            min={0}
            step="1"
            required
            value={form.price}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updateField("price", event.target.value)
            }
            className={inputClass}
            placeholder="420"
          />
        </Field>
      </div>

      <Field label="Image" htmlFor="arrival-image-file">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed px-6 py-12 text-center transition-colors ${
            dragActive
              ? "border-accent bg-accent/5"
              : "border-muted/60 bg-background hover:border-accent/60 hover:bg-accent/[0.03]"
          }`}
        >
          <input
            id="arrival-image-file"
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_TYPES.join(",")}
            className="hidden"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const picked = event.target.files?.[0] ?? null;
              validateAndSetFile(picked);
            }}
          />
          {file ? (
            <>
              <span className="text-sm font-medium text-foreground">
                {file.name}
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-foreground/50">
                {(file.size / 1024 / 1024).toFixed(2)} MB · click or drop to replace
              </span>
            </>
          ) : (
            <>
              <UploadIcon />
              <span className="text-sm font-medium text-foreground">
                Drop image here, or click to browse
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-foreground/50">
                JPG, PNG, WebP or AVIF · up to 10MB
              </span>
            </>
          )}
        </div>
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt="Preview"
            className="mt-4 h-64 w-full rounded-2xl object-cover"
          />
        ) : null}
      </Field>

      <Field label="Description" htmlFor="arrival-description" optional>
        <textarea
          id="arrival-description"
          rows={4}
          maxLength={600}
          value={form.description}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            updateField("description", event.target.value)
          }
          className={`${inputClass} min-h-[120px] resize-y rounded-3xl`}
          placeholder="Crafted in mulberry silk with a bias-cut silhouette..."
        />
      </Field>

      {status.kind === "uploading" ? (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground/60">
            <span>Uploading image</span>
            <span>{uploadPercent}%</span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={uploadPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/10"
          >
            <div
              className="h-full bg-accent transition-[width] duration-200 ease-out"
              style={{ width: `${uploadPercent}%` }}
            />
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={busy}>
          {status.kind === "uploading"
            ? "Uploading…"
            : status.kind === "saving"
              ? "Saving…"
              : "Post Arrival"}
        </Button>

        {status.kind === "success" ? (
          <p
            role="status"
            className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent"
          >
            Posted — “{status.item.name}” is live.
          </p>
        ) : null}
        {status.kind === "error" ? (
          <p role="alert" className="text-sm leading-relaxed text-red-700">
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded-full border border-muted/60 bg-background px-6 py-3.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

interface FieldProps {
  label: string;
  htmlFor: string;
  optional?: boolean;
  children: ReactNode;
}

function Field({
  label,
  htmlFor,
  optional = false,
  children,
}: FieldProps): ReactElement {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-2">
      <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground/60">
        {label}
        {optional ? (
          <span className="text-foreground/40 normal-case tracking-normal">
            (optional)
          </span>
        ) : null}
      </span>
      {children}
    </label>
  );
}

function UploadIcon(): ReactElement {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="text-foreground/60"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}
