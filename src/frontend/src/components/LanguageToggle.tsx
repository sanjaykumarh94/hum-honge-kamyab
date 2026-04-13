import { useLanguage } from "../context/LanguageContext";

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className = "" }: LanguageToggleProps) {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={language === "en" ? "Switch to Hindi" : "Switch to English"}
      data-ocid="language-toggle"
      className={`
        inline-flex items-center gap-0.5 px-2.5 py-1 rounded-sm border border-border
        bg-muted/60 hover:bg-muted text-xs font-semibold font-body
        transition-colors duration-150 select-none shrink-0
        ${className}
      `}
    >
      <span
        className={`transition-colors duration-150 ${
          language === "en" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        EN
      </span>
      <span className="text-muted-foreground mx-0.5">|</span>
      <span
        className={`transition-colors duration-150 ${
          language === "hi" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        HI
      </span>
    </button>
  );
}
