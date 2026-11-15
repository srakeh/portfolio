# Anand Raj Gouda — Personal Portfolio

Minimalist personal portfolio website replicated with 1:1 structural fidelity from [abhinavsrivatsa.com](https://www.abhinavsrivatsa.com/).

---

## ⚡ Instant Preview

1. Open `C:\Users\anand\.gemini\antigravity\scratch\cybersec-portfolio`
2. Open **`index.html`** in your browser.

---

## 🎯 Design & Structural Highlights

- **Minimalist Clean Aesthetic**: Inter font for crisp body and headings, Newsreader italic serif for editorial location notes, and Caveat accents.
- **Fixed Desktop Left Sidebar**: Fixed navigation positioned at `left-[calc(50% - 495px)] top-28` with slide-in blue highlight hover pill.
- **Mobile Navigation**: Minimalist sticky header with animated hamburger menu that expands into a clean overlay.
- **Project Cards**: Pill hover interaction (`border-radius: 24px`) with custom layered SVG mini-window/calendar icons.
- **Interactive Work/Education History**: `annotation-host` blur effect (hovering an item smoothly blurs and reduces opacity of other items).
- **Interactive Modals & Drawers**:
  - **Command Palette (`Ctrl + K` / `Cmd + K`)**: Fast search across pages, projects, and contact channels.
  - **Theme Cycler**: Sequential toggle (`System` -> `Light` -> `Dark` -> `System`) with persistent storage and system scheme synchronization.
  - **Colophon & Usage Rights**: Centered desktop dialogs / mobile bottom sheets.
- **Single Page App Routing**: Smooth hash-based view switching (`#home`, `#projects`, `#about`, `#connect`) with zero reload.

---

## 📁 Project Structure

```
cybersec-portfolio/
├── index.html       # Markup, views (Home, Projects, About, Connect), modals
├── style.css        # CSS variables, tokens, quiet-links, SVG icon styling
├── script.js        # View routing, theme cycle, Cmd+K search, mobile menu
└── README.md        # Documentation
```
