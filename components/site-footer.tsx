export function SiteFooter() {
  return (
    <footer className="border-t border-[hsl(var(--ethblox-border))] bg-[hsl(var(--ethblox-bg))] py-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-float-up absolute bottom-0 left-1/4 w-2 h-2 bg-[hsl(var(--ethblox-accent-cyan))]/20 rounded-sm" />
        <div
          className="animate-float-up absolute bottom-0 left-1/2 w-2 h-2 bg-[hsl(var(--ethblox-accent-cyan))]/20 rounded-sm"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="animate-float-up absolute bottom-0 left-3/4 w-2 h-2 bg-[hsl(var(--ethblox-accent-cyan))]/20 rounded-sm"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-6 max-w-[1800px] relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="flex flex-col items-center md:items-start gap-3">
            <h3 className="font-heading text-xl font-semibold tracking-wider text-[hsl(var(--ethblox-text-primary))]">
              ETHBLOX
            </h3>
            <p className="text-xs text-[hsl(var(--ethblox-text-tertiary))] font-mono uppercase tracking-wider">
              Programmable matter for Ethereum
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-8 text-sm font-medium">
            <a
              href="https://docs.ethblox.art"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[hsl(var(--ethblox-text-secondary))] hover:text-[hsl(var(--ethblox-accent-cyan))] transition-colors uppercase tracking-wide"
            >
              Docs
            </a>
            <a
              href="https://github.com/ethblox"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[hsl(var(--ethblox-text-secondary))] hover:text-[hsl(var(--ethblox-accent-cyan))] transition-colors uppercase tracking-wide"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com/ethblox"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[hsl(var(--ethblox-text-secondary))] hover:text-[hsl(var(--ethblox-accent-cyan))] transition-colors uppercase tracking-wide"
            >
              X
            </a>
            <a
              href="https://discord.gg/ethblox"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[hsl(var(--ethblox-text-secondary))] hover:text-[hsl(var(--ethblox-accent-cyan))] transition-colors uppercase tracking-wide"
            >
              Discord
            </a>
          </nav>

          <div className="text-center md:text-right">
            <a
              href="https://discord.gg/ethblox"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-heading font-semibold text-[hsl(var(--ethblox-accent-cyan))] hover:text-[hsl(var(--ethblox-accent-cyan))]/80 transition-colors uppercase tracking-wide"
            >
              Become a Genesis Builder →
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-[hsl(var(--ethblox-border))] text-center">
          <p className="text-xs text-[hsl(var(--ethblox-text-tertiary))] font-mono">
            © {new Date().getFullYear()} ETHBLOX Protocol · A physics-driven creative substrate for Ethereum
          </p>
        </div>
      </div>
    </footer>
  )
}
