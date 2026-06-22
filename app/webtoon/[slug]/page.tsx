import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  cutPaths,
  episodes,
  getEpisode,
  siblingEpisodes,
} from "../data";
import EpisodeReader from "../components/EpisodeReader";

// 모든 에피소드를 빌드 타임에 정적 생성
export function generateStaticParams() {
  return episodes.map((ep) => ({ slug: ep.slug }));
}

// 정적 생성된 slug 외 요청은 404
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ep = getEpisode(slug);
  if (!ep) return {};
  return {
    title: `${ep.title} | 무펭이 사가`,
    description: ep.description,
    openGraph: {
      title: `${ep.title} | 무펭이 사가`,
      description: ep.description,
      images: [{ url: `${ep.imageDir}/01.jpg` }],
      type: "article",
      locale: "ko_KR",
    },
  };
}

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const episode = getEpisode(slug);
  if (!episode) notFound();

  const cuts = cutPaths(episode);
  const { prev, next } = siblingEpisodes(slug);

  return (
    <EpisodeReader episode={episode} cuts={cuts} prev={prev} next={next} />
  );
}
