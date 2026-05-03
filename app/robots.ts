import type { MetadataRoute } from "next"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ulisesmolina.vercel.app"

const AI_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "Google-Extended",
  "PerplexityBot",
  "Perplexity-User",
  "CCBot",
  "Bytespider",
  "Amazonbot",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "FacebookBot",
  "cohere-ai",
  "DuckAssistBot",
  "Diffbot",
  "ImagesiftBot",
  "PetalBot",
  "YouBot",
  "Omgilibot",
  "Omgili",
  "Timpibot",
  "MistralAI-User",
  "ICC-Crawler",
  "AI2Bot",
  "Kangaroo Bot",
  "PanguBot",
  "Scrapy",
  "Webzio-Extended",
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      ...AI_BOTS.map((userAgent) => ({
        userAgent,
        disallow: "/",
      })),
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
