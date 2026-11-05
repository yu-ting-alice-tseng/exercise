import SetupForm from "@/components/SetupForm";
import RecentList from "@/components/RecentList";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-4 pt-6 pb-4">
      <h1 className="text-2xl font-bold">產生法文練習題</h1>
      <p className="mt-1 mb-5 text-muted">
        選擇等級和範圍，可以直接線上作答、一鍵檢查答案，也可以印出 A／B 兩份考卷。
      </p>
      <SetupForm />
      <RecentList />
    </main>
  );
}
