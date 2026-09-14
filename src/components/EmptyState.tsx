import Link from "next/link";
import { Inbox } from "lucide-react";

/**
 * İçerik henüz girilmemiş bölümlerde gösterilir. Ziyaretçiye boş bir sayfa
 * yerine anlamlı bir mesaj ve iletişim yolu sunar.
 */
export default function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border border-dashed border-line rounded-xl py-20 px-6 text-center space-y-4 bg-surface/40">
      <Inbox className="w-10 h-10 text-fg-dim mx-auto" />
      <h3 className="text-lg font-semibold text-fg">{title}</h3>
      <p className="text-sm text-fg-muted max-w-md mx-auto leading-relaxed">
        {description}
      </p>
      <Link
        href="/iletisim"
        className="inline-block text-xs font-semibold text-bronze-light hover:text-bronze-light transition-colors pt-2"
      >
        Bilgi almak için bize ulaşın →
      </Link>
    </div>
  );
}
