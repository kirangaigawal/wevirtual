import { Link, useRouter } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Work", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Articles", href: "/#articles" },
  { label: "Store", href: "/#store" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        scrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border"
          : "bg-transparent"
      }`}
      data-ocid="header"
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        {/* Logo / Agency Name */}
        <Link
          to="/"
          className="font-display font-bold text-lg md:text-xl tracking-tight text-foreground hover:opacity-70 transition-smooth"
          data-ocid="header.logo_link"
        >
          WeVirtual
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-8"
          data-ocid="header.nav"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                if (link.href.startsWith("/#")) {
                  e.preventDefault();
                  handleNavClick(link.href);
                }
              }}
              className="text-label text-foreground hover:opacity-50 transition-smooth"
              data-ocid={`header.nav.${link.label.toLowerCase()}_link`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="md:hidden p-2 text-foreground hover:opacity-60 transition-smooth"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          data-ocid="header.menu_toggle"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden bg-background border-t border-border px-6 py-6 flex flex-col gap-5"
          data-ocid="header.mobile_menu"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-label text-foreground hover:opacity-50 transition-smooth"
              data-ocid={`header.mobile_nav.${link.label.toLowerCase()}_link`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <footer
      className="py-12 px-6 md:px-10 border-t"
      style={{
        background: "#ffe0a8",
        borderColor: "rgba(0,0,0,0.10)",
        color: "#111111",
      }}
      data-ocid="footer"
    >
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10">
        <div className="flex flex-col gap-1">
          <p className="font-display font-bold text-xl mb-1 text-black">
            WeVirtual
          </p>
          <p
            className="text-sm font-body"
            style={{ color: "rgba(0,0,0,0.55)" }}
          >
            Media Asset Management — Offline LTO & Cloud
          </p>
          <p
            className="text-xs font-body mt-3 leading-relaxed"
            style={{ color: "rgba(0,0,0,0.48)" }}
          >
            Web Emerging Technologies Pvt Ltd
            <br />
            SR/NO - 44/3 ahead of Rims School,
            <br />
            Wadachiwadi Road, Undri, Pune 411060
          </p>
          <p
            className="text-xs font-body mt-1"
            style={{ color: "rgba(0,0,0,0.48)" }}
          >
            Contact: Sharad Deshmukh
          </p>
          <p
            className="text-xs font-body"
            style={{ color: "rgba(0,0,0,0.48)" }}
          >
            Mobile: 9823312123, 9769295026
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2 md:mt-1">
          <p
            className="text-xs font-body"
            style={{ color: "rgba(0,0,0,0.45)" }}
          >
            © {year}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-smooth hover:text-black"
              data-ocid="footer.caffeine_link"
            >
              Built with love using caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
    </div>
  );
}
