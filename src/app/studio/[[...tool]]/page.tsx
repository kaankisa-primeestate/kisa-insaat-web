import Studio from "./Studio";
import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Kısa İnşaat Yönetim Paneli",
  robots: { index: false, follow: false },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
  interactiveWidget: "resizes-content" as const,
};

/**
 * Yönetim paneli. Sanity proje kimliği tanımlı değilse panel yerine
 * kurulum yönergesi gösterilir, böylece derleme ve dağıtım hata vermez.
 */
export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="min-h-screen bg-ground text-fg flex items-center justify-center p-6">
        <div className="max-w-xl space-y-4 bg-surface border border-line rounded-xl p-8">
          <h1 className="text-xl font-bold text-fg">
            Yönetim paneli henüz bağlanmadı
          </h1>
          <p className="text-sm text-fg-muted leading-relaxed">
            Paneli açmak için Sanity proje kimliğinin ortam değişkeni olarak
            tanımlanması gerekiyor.
          </p>
          <ol className="text-sm text-fg-muted space-y-2 list-decimal list-inside">
            <li>
              <a
                href="https://sanity.io/manage"
                className="text-bronze-light hover:underline"
              >
                sanity.io/manage
              </a>{" "}
              adresinden bir proje oluşturun.
            </li>
            <li>
              Proje kimliğini Vercel&apos;de{" "}
              <code className="text-bronze-light">
                NEXT_PUBLIC_SANITY_PROJECT_ID
              </code>{" "}
              değişkenine yazın.
            </li>
            <li>
              Aynı sayfada bu sitenin adresini CORS izinli adresler listesine
              ekleyin.
            </li>
          </ol>
        </div>
      </main>
    );
  }

  return <Studio />;
}
