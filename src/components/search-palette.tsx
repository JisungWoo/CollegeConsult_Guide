"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { searchDocuments } from "@/content/search-index";
import { useLocalState } from "./local-state-provider";

export function SearchPalette() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const { state, update } = useLocalState();
  const results = useMemo(() => searchDocuments(query), [query]);

  const open = () => {
    dialogRef.current?.showModal();
    window.setTimeout(() => inputRef.current?.focus(), 0);
  };

  const close = () => {
    dialogRef.current?.close();
    setQuery("");
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        open();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const remember = () => {
    const value = query.trim();
    if (!value) return;
    update((current) => ({ ...current, recentSearches: [value, ...current.recentSearches.filter((item) => item !== value)].slice(0, 5) }));
    close();
  };

  return (
    <>
      <button className="search-trigger" type="button" onClick={open} aria-keyshortcuts="Control+K Meta+K">
        <span>Search the desk</span><kbd>Ctrl K</kbd>
      </button>
      <dialog className="search-dialog" ref={dialogRef} aria-labelledby="search-title">
        <div className="search-dialog__header">
          <div>
            <p className="eyebrow">Quick reference</p>
            <h2 id="search-title">Search the field guide</h2>
          </div>
          <button className="text-button" type="button" onClick={close}>Close <span aria-hidden="true">×</span></button>
        </div>
        <label className="field-label" htmlFor="global-search">Search schools, lessons, policies, cases, tools, and terms</label>
        <input ref={inputRef} id="global-search" className="search-input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “Brown open curriculum”" />
        <p className="sr-only" aria-live="polite">{query ? `${results.length} results found.` : ""}</p>
        {query ? (
          <ol className="search-results">
            {results.map((result) => (
              <li key={`${result.category}-${result.id}`}>
                <Link href={result.href} onClick={remember}>
                  <span className="search-results__category">{result.category}</span>
                  <strong>{result.title}</strong>
                  <span>{result.summary}</span>
                </Link>
              </li>
            ))}
            {!results.length && <li className="empty-state">No matching entry. Try a school, policy, grade level, or application term.</li>}
          </ol>
        ) : state.recentSearches.length ? (
          <div className="recent-searches">
            <p className="eyebrow">Recent searches — stored only in this browser</p>
            <div>{state.recentSearches.map((item) => <button type="button" className="text-button" key={item} onClick={() => setQuery(item)}>{item}</button>)}</div>
          </div>
        ) : (
          <p className="empty-state">Try “junior year,” “teacher recommendation,” “financial aid,” or “Columbia Core.”</p>
        )}
      </dialog>
    </>
  );
}
