import { Suspense } from "react";
import TechNewCard, { DevToArticle } from "@/Components/TechNewCard";
import TechNewSkeleton from "@/Components/TechNewSkeleton";

async function TechNewList() {
  const response = await fetch("https://dev.to/api/articles?per_page=20", {
    next: { revalidate: 3600 },
  });
  const articles: DevToArticle[] = await response.json();

  return (
    <div className="flex flex-col gap-5">
      {articles.map((article) => (
        <TechNewCard key={article.id} article={article} />
      ))}
    </div>
  );
}

export default function TechNewsPage() {
  return (
    <div className="p-5 space-y-6">
      <h1 className="text-3xl font-bold">Tech News</h1>
      <Suspense fallback={<TechNewSkeleton />}>
        <TechNewList />
      </Suspense>
    </div>
  );
}
