import SetupForm from "@/components/SetupForm";
import RecentList from "@/components/RecentList";
import { container } from "@/components/ui";
import ProgressStrip from "@/components/ProgressStrip";
import { MotDuJour, Skyline } from "@/components/Decor";
import { T, ZhOnly } from "@/components/T";

export default function Home() {
  return (
    <main className={`${container} pt-6 sm:pt-10`}>
      <div className="relative mb-6 grid gap-5 sm:mb-8 md:grid-cols-[minmax(0,1fr)_300px] md:items-end">
        <div className="relative">
          {/* 巴黎屋頂剪影 */}
          <Skyline className="pointer-events-none absolute -bottom-2 left-0 hidden h-28 w-[min(100%,560px)] text-accent opacity-[0.13] sm:block" />
          <div className="relative pb-2 sm:pb-16">
            <ZhOnly>
              <div className="eyebrow">Qu&apos;est-ce qu&apos;on révise aujourd&apos;hui ?</div>
            </ZhOnly>
            <h1 className="display text-3xl font-bold sm:text-5xl">
              <T zh="今天想練習什麼？" fr="Qu’est-ce qu’on révise aujourd’hui ?" />
            </h1>
            <p className="mt-3 max-w-xl text-muted">
              <T
                zh="選擇等級和範圍，可以直接線上作答、一鍵檢查答案，也可以印出 A／B 兩份考卷。"
                fr="Choisissez un niveau et un thème : répondez en ligne avec correction immédiate, ou imprimez deux copies A et B."
              />
            </p>
          </div>
        </div>
        <MotDuJour />
      </div>
      <ProgressStrip />
      <SetupForm recent={<RecentList />} />
    </main>
  );
}
