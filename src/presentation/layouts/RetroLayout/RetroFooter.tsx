"use client";

/**
 * Retro Footer component for RetroLayout
 * Simulates Internet Explorer 5 status bar on Windows 98
 */
export function RetroFooter() {
  return (
    <footer className="retro-footer">
      <div className="retro-statusbar">
        <div className="retro-statusbar-section retro-statusbar-main">
          <span className="retro-statusbar-icon">✅</span>
          <span>Done</span>
        </div>
        <div className="retro-statusbar-section retro-statusbar-zone">
          <span>🌐 Internet</span>
        </div>
      </div>
    </footer>
  );
}
