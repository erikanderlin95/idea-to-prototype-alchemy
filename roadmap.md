# ClynicQ roadmap

## Blank route transitions
- [x] Replace blank lazy-route fallback and retain the existing page during navigation.
- [x] Keep scroll reset aligned with the destination page becoming ready.
- [ ] Test delayed lazy-page navigation and direct loading on mobile and desktop.

## Safe mobile and desktop performance
- [x] Remove unused per-card account checks and redundant listing renders.
- [x] Reduce partner-logo downloads without changing appearance or proportions.
- [x] Verify refresh, filters, intake and detail/back navigation on mobile and desktop.

## Refresh speed only
- [x] Measure shared page downloads and check query timings without changing data or functionality.
- [x] Defer article dictionaries to the pages that use them, preserving all four languages.
- [x] Verify refreshes, blog translations and existing navigation; do not publish.

## Page loading and refresh performance
- [x] Identify page-loading and refresh bottlenecks without changing queue behaviour.
- [x] Reduce unnecessary initial downloads and repeated requests while preserving navigation and translations.
- [x] Verify page opening, refreshes and clinic browsing; leave production unchanged.

## Dr Chung knee osteoarthritis draft
- [x] Extract and inspect original cover, knee diagram, exercise illustrations, clinic photo and identified doctor portrait.
- [x] Add the supplied article, author, references, category and four-language content using the existing blog layout.
- [x] Keep the article unpublished and verify category filtering, clinic links, images and mobile reading.

## Dark mode compatibility
- [x] Stop phone dark mode from auto-inverting the UI (declare light color-scheme in HTML and CSS).
- [x] Verify homepage renders white/dark-text with an emulated dark-mode phone.

## Clinic listing scroll restore
- [x] Fix scroll save overwriting real position during route change (removed unmount flush).
- [x] Anchor restore to the top visible clinic card; keep re-applying while layout settles; stop on user touch.
- [x] Verify back navigation returns to the same clinic card at two scroll depths on mobile viewport.

## Clinic details opening position
- [x] Reproduce browser-history clinic details reopening at the bottom.
- [x] Reset every clinic detail entry to the top without overriding listing restoration; verify mobile tap, in-app back and browser history.

## 24-hour clinic listing placement
- [x] Keep 24-hour directory clinic listings exclusively on the dedicated 24-hour clinics page; verify old caches are excluded and all 11 directory cards remain.
