import Link from "next/link";
import IdiomsClient from "@/components/idioms/IdiomsClient";
import { T, ZhOnly } from "@/components/T";
import { container } from "@/components/ui";
import { IDIOMS } from "@/lib/idioms";

export const metadata = { title: "俗語與諺語｜法文練習題" };

export default function ExpressionsPage() {
  return (
    <main className={`${container} pt-6 sm:pt-8`}>
      <Link href="/learn/" className="mb-2 inline-flex min-h-9 items-center text-sm text-muted hover:text-ink">
        ← <T zh="學習" fr="Apprendre" />
      </Link>
      <div className="mb-5">
        <ZhOnly>
          <div className="eyebrow">Expressions et proverbes</div>
        </ZhOnly>
        <h1 className="display text-3xl font-bold">
          <T zh="俗語與諺語" fr="Expressions et proverbes" />
        </h1>
        <p className="mt-2 max-w-2xl text-muted">
          <T
            zh={`${IDIOMS.length} 則法國人常說的慣用語、諺語和口語。每則都有字面意思、真正的意思、意思相近的中文說法、例句和發音，還可以先遮住意思自己猜。`}
            fr={`${IDIOMS.length} expressions, proverbes et mots familiers, avec le sens mot à mot, le vrai sens, un équivalent chinois, un exemple et la prononciation.`}
          />
        </p>
      </div>
      <IdiomsClient />
    </main>
  );
}
