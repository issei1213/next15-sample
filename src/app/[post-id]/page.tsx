import { Suspense } from "react";
import { setTimeout } from "node:timers/promises";
import { Metadata } from "next";
import type { Post } from "@/app/types";
import Link from "next/link";

// 📍PPRを有効化
export const experimental_ppr = true;

type Props = {
  params: { "post-id": string };
};

const fetchPostDetail = async (postId: string) => {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, { cache: "no-store" }).then(
    (res) => res.json()
  );
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const postDetail: Post = await fetchPostDetail(params["post-id"]);
  return {
    title: `記事詳細 | ${postDetail.title}`,
    description: postDetail.body,
  };
};

export default function PostDetailPage({ params }: Props) {
  return (
    <main className="max-w-2xl w-full mx-auto pt-4">
      <h2 className="text-xl font-bold">記事詳細</h2>
      <div className="flex gap-4">
        {params["post-id"] !== "1" && (
          <Link
            href={`/${Number(params["post-id"]) - 1}`}
            className="py-2 px-4 rounded bg-green-300 inline-block"
          >
            前へ
          </Link>
        )}
        <Link
          href={`/${Number(params["post-id"]) + 1}`}
          className="py-2 px-4 rounded bg-amber-400 inline-block"
        >
          次へ
        </Link>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <PostDetail id={params["post-id"]} />
      </Suspense>
    </main>
  );
}

const PostDetail = async ({ id }: { id: string }) => {
  const post: Post = await fetchPostDetail(id);

  await setTimeout(3000);

  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  );
};
