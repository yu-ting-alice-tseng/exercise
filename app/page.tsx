import SetupForm from "@/components/SetupForm";
import RecentList from "@/components/RecentList";
import { container } from "@/components/ui";

export default function Home() {
  return (
    <main className={`${container} pt-6 sm:pt-10`}>
      <div className="mb-6 sm:mb-8">
        <div className="eyebrow">Qu&apos;est-ce qu&apos;on révise aujourd&apos;hui ?</div>
        <h1 className="display text-3xl font-bold sm:text-4xl">今天想練習什麼？</h1>
        <p className="mt-2 max-w-2xl text-muted">
          選擇等級和範圍，可以直接線上作答、一鍵檢查答案，也可以印出 A／B 兩份考卷。
        </p>
      </div>
      <SetupForm recent={<RecentList />} />
    </main>
  );
}
