# ClynicQ roadmap

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
- [ ] Keep 24-hour directory clinic listings exclusively on the dedicated 24-hour clinics page.
