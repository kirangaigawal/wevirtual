import { Link, useRouter } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Work", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Clients", href: "/#clients" },
  { label: "Our World", href: "/#culture" },
  { label: "Contact Us", href: "/#contact" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const router = useRouter();
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);
      if (currentY > 100) {
        setNavHidden(currentY > lastScrollY.current);
      } else {
        setNavHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      const isHome = router.state.location.pathname === "/";
      if (!isHome) {
        router.navigate({ to: "/" }).then(() => {
          setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 100);
        });
      } else {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? "bg-[#fff4e4]/92 backdrop-blur-sm border-b border-black/10 shadow-sm"
          : "bg-transparent"
      } ${navHidden ? "nav-hidden" : "nav-visible"}`}
      data-ocid="header"
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link
          to="/"
          className="hover:opacity-80 transition-smooth flex items-center"
          data-ocid="header.logo_link"
        >
          <img
            src="/assets/images/wevirtual-logo-new.png"
            alt="WeVirtual"
            style={{ height: "48px", width: "auto", background: "transparent" }}
          />
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
              className="nav-link text-label text-foreground hover:opacity-50 transition-smooth"
              data-ocid={`header.nav.${link.label.toLowerCase().replace(/\s/g, "_")}_link`}
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
          className="md:hidden bg-[#fff4e4]/92 border-t border-black/10 px-6 py-6 flex flex-col gap-5"
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
              data-ocid={`header.mobile_nav.${link.label.toLowerCase().replace(/\s/g, "_")}_link`}
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
        background: "linear-gradient(160deg, #ffe8c4 0%, #ffd8a0 100%)",
        borderColor: "rgba(0,0,0,0.10)",
        color: "#111111",
      }}
      data-ocid="footer"
    >
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10">
        <div className="flex flex-col gap-1">
          <div className="mb-2">
            <img
              src="/assets/images/wevirtual-logo-new.png"
              alt="WeVirtual"
              style={{
                height: "60px",
                width: "auto",
                background: "transparent",
              }}
            />
          </div>
          <p className="text-sm font-body" style={{ color: "#333333" }}>
            Media Asset Management — Offline LTO & Cloud
          </p>
          <p
            className="text-xs font-body mt-3 leading-relaxed"
            style={{ color: "#444444" }}
          >
            Web Emerging Technologies Pvt Ltd
            <br />
            SR/NO - 44/3 ahead of Rims School,
            <br />
            Wadachiwadi Road, Undri, Pune 411060
          </p>
          <p className="text-xs font-body mt-1" style={{ color: "#444444" }}>
            Contact: Sharad Deshmukh
          </p>
          <p className="text-xs font-body" style={{ color: "#444444" }}>
            Mobile: 9823312123, 9769295026
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2 md:mt-1">
          <p className="text-xs font-body" style={{ color: "#444444" }}>
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

// Watermark instances spaced every 100vh to cover the full scrollable height of any page
const WATERMARK_OFFSETS = [
  "10vh",
  "110vh",
  "210vh",
  "310vh",
  "410vh",
  "510vh",
  "610vh",
  "710vh",
  "810vh",
  "910vh",
];

export function Layout({ children }: LayoutProps) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(160deg, #fff8ee 0%, #fff0d8 40%, #ffe4b8 100%)",
        position: "relative",
      }}
    >
      {/* Watermark container — absolutely positioned so logos scroll WITH the page */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
          userSelect: "none",
          overflow: "hidden",
        }}
      >
        {WATERMARK_OFFSETS.map((top) => (
          <img
            key={top}
            src="/assets/images/wevirtual-logo-new.png"
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              top,
              left: "50%",
              transform: "translateX(-50%)",
              width: "65vw",
              maxWidth: "850px",
              height: "auto",
              opacity: 0.16,
              pointerEvents: "none",
              userSelect: "none",
              objectFit: "contain",
            }}
          />
        ))}
      </div>

      <Header />
      <main
        className="flex-1 pt-16 md:pt-20 page-enter"
        style={{ position: "relative", zIndex: 1 }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
