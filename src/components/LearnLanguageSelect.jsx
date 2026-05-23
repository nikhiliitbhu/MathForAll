import { useLanguage } from "@/components/LanguageProvider";

export function LearnLanguageSelect({ className = "" }) {
  const { lang, setLanguage, t } = useLanguage();

  return (
    <div className={"relative" + (className ? " " + className : "")}>
      <button
        type="button"
        className="px-3 py-2 rounded-xl text-xs font-semibold hover:bg-secondary transition-colors flex items-center gap-2"
      >
        {t.navbar.selectLanguage}
      </button>

      {/* Native select: keep it simple + accessible */}
      <select
        value={lang}
        onChange={(e) => setLanguage(e.target.value)}
        className="absolute inset-0 opacity-0 cursor-pointer"
        aria-label={t.navbar.selectLanguage}
      >
        <option value="en">{t.navbar.english}</option>
        <option value="hi">{t.navbar.hindi}</option>
      </select>
    </div>
  );
}

