# ClynicQ roadmap

## Dark mode compatibility
- [x] Stop phone dark mode from auto-inverting the UI (declare light color-scheme in HTML and CSS).
- [ ] Verify key pages render readable with the phone in dark mode.

## Clinic listing scroll restore
- [x] Harden scroll save: flush on tap, page hide and unmount; retry restore as content grows (up to 6s).
- [ ] Verify scroll-and-back again on mobile preview.
