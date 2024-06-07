import { Suspense } from "react";
import { setTimeout } from "node:timers/promises";
import { Metadata } from "next";
import { type Post } from "@/app/types";
import Link from "next/link";

const fetchPostList = async () => {
  return fetch("https://jsonplaceholder.typicode.com/posts", { cache: "no-store" }).then((res) =>
    res.json()
  );
};

export const metadata: Metadata = {
  title: "記事一覧",
  description: "このページは記事一覧です。",
};

// 📍PPRを有効化
export const experimental_ppr = true;

export default function TodoIndexPage() {
  return (
    <main className="max-w-2xl w-full mx-auto pt-4">
      <h2 className="text-xl font-bold">記事一覧</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <PostIndex />
      </Suspense>
    </main>
  );
}

const PostIndex = async () => {
  const postList: Post[] = await fetchPostList();

  await setTimeout(3000);

  return (
    <ul className="flex flex-col gap-4 mt-4">
      {postList.map((post) => (
        <li key={post.id}>
          <Link href={`${post.id}`}>
            {post.id}: {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
