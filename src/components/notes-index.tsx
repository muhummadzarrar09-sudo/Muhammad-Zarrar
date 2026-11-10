"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRightIcon } from "./icons";

export type NoteSummary = {
  slug: string;
  title: string;
  excerpt: string;
  dateLabel: string;
  minutes: number;
  topics: { id: string; label: string }[];
};

/**
 * The Field Notes index: search + topic filters.
 *
 * Everything is server-rendered first — the page is fully readable and
 * every note is listed with JavaScript disabled. This component only
 * narrows what is already on the page. No index is fetched, nothing is
 * counted, nothing is stored.
 */
export function NotesIndex({ notes }: { notes: NoteSummary[] }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<string>("all");

  const topics = useMemo(() => {
    const seen = new Map<string, string>();
    for (const note of notes) {
      for (const t of note.topics) seen.set(t.id, t.label);
    }
    return [...seen].map(([id, label]) => ({ id, label }));
  }, [notes]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return notes.filter((note) => {
      if (topic !== "all" && !note.topics.some((t) => t.id === topic)) {
        return false;
      }
      if (!needle) return true;
      const haystack = [
        note.title,
        note.excerpt,
        ...note.topics.map((t) => t.label),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [notes, query, topic]);

  return (
    <>
      <div className="notes-tools">
        <div className="notes-search">
          <label className="sr-only" htmlFor="note-search">
            Search field notes
          </label>
          <input
            id="note-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search notes — price, speed, Google…"
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        <div className="topic-chips" role="group" aria-label="Filter notes by topic">
          <button
            type="button"
            className="topic-chip"
            aria-pressed={topic === "all"}
            onClick={() => setTopic("all")}
          >
            All notes
          </button>
          {topics.map((t) => (
            <button
              key={t.id}
              type="button"
              className="topic-chip"
              aria-pressed={topic === t.id}
              onClick={() => setTopic(topic === t.id ? "all" : t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <p className="notes-count" role="status" aria-live="polite">
        {visible.length === notes.length
          ? `${notes.length} notes`
          : `${visible.length} of ${notes.length} notes`}
      </p>

      {visible.length === 0 ? (
        <div className="notes-empty">
          <p>
            No note matches <strong>“{query.trim()}”</strong>. These notes stay
            close to what we actually find in audits — try{" "}
            <button
              type="button"
              className="notes-empty-link"
              onClick={() => {
                setQuery("");
                setTopic("all");
              }}
            >
              clearing the filter
            </button>
            .
          </p>
        </div>
      ) : (
        <div className="index-list">
          {visible.map((note) => (
            <Link
              key={note.slug}
              href={`/notes/${note.slug}`}
              className="index-row"
              data-spotlight
            >
              <span className="idx-no">
                {String(
                  notes.findIndex((n) => n.slug === note.slug) + 1,
                ).padStart(2, "0")}
              </span>
              <div>
                <h2 className="idx-title">{note.title}</h2>
                <p className="idx-sub">{note.excerpt}</p>
                <p className="note-meta">
                  {note.topics.map((t) => (
                    <span key={t.id} className="note-topic">
                      {t.label}
                    </span>
                  ))}
                  <span className="note-meta-item">{note.minutes} min read</span>
                </p>
              </div>
              <span className="idx-side">
                <span className="note-date">{note.dateLabel}</span>
                <span className="idx-arrow">
                  <ArrowRightIcon size={20} />
                </span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
