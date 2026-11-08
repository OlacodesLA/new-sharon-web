import { site } from "./content";
import type { YtVideo } from "./youtube-types";

export type { YtVideo } from "./youtube-types";

const API = "https://www.googleapis.com/youtube/v3";

export type BroadcastChannel = {
  handle: string;
  channelId: string;
  url: string;
};

function familyChannel(): BroadcastChannel {
  return {
    handle: site.youtube.handle,
    channelId:
      process.env.YOUTUBE_CHANNEL_ID?.trim() || site.youtube.channelId,
    url: site.youtube.url,
  };
}

export type ChannelBroadcasts = {
  live: YtVideo | null;
  previous: YtVideo[];
};

type SearchItem = {
  id?: { videoId?: string };
  snippet?: {
    title?: string;
    publishedAt?: string;
    liveBroadcastContent?: string;
    thumbnails?: Record<string, { url?: string }>;
  };
};

type VideoItem = {
  id?: string;
  snippet?: {
    title?: string;
    publishedAt?: string;
    liveBroadcastContent?: string;
    thumbnails?: Record<string, { url?: string }>;
  };
  liveStreamingDetails?: {
    actualStartTime?: string;
    actualEndTime?: string;
    scheduledStartTime?: string;
  };
};

function thumbFrom(thumbs?: Record<string, { url?: string }>, id?: string) {
  return (
    thumbs?.maxres?.url ||
    thumbs?.standard?.url ||
    thumbs?.high?.url ||
    thumbs?.medium?.url ||
    (id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "")
  );
}

function fromSearch(item: SearchItem, live: boolean): YtVideo | null {
  const id = item.id?.videoId;
  if (!id) return null;
  return {
    id,
    title: item.snippet?.title?.trim() || "Sharon gathering",
    publishedAt: item.snippet?.publishedAt || new Date().toISOString(),
    thumbnail: thumbFrom(item.snippet?.thumbnails, id),
    live,
  };
}

function fromVideo(item: VideoItem): YtVideo | null {
  const id = item.id;
  if (!id) return null;
  const live =
    item.snippet?.liveBroadcastContent === "live" ||
    Boolean(
      item.liveStreamingDetails?.actualStartTime &&
        !item.liveStreamingDetails.actualEndTime,
    );
  return {
    id,
    title: item.snippet?.title?.trim() || "Sharon gathering",
    publishedAt: item.snippet?.publishedAt || new Date().toISOString(),
    thumbnail: thumbFrom(item.snippet?.thumbnails, id),
    live,
  };
}

async function yt<T>(
  path: string,
  params: Record<string, string>,
  fresh = false,
): Promise<T | null> {
  const key = process.env.YOUTUBE_API_KEY?.trim();
  if (!key) return null;

  const url = new URL(`${API}/${path}`);
  url.searchParams.set("key", key);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  const res = await fetch(
    url,
    fresh ? { cache: "no-store" } : { next: { revalidate: 120 } },
  );
  if (!res.ok) return null;
  return (await res.json()) as T;
}

async function searchEvent(
  channelId: string,
  eventType: "live" | "completed",
  max = 16,
) {
  const data = await yt<{ items?: SearchItem[] }>(
    "search",
    {
      part: "snippet",
      channelId,
      eventType,
      type: "video",
      order: "date",
      maxResults: String(max),
    },
    eventType === "live",
  );
  return (data?.items ?? [])
    .map((item) => fromSearch(item, eventType === "live"))
    .filter((item): item is YtVideo => Boolean(item));
}

async function videosById(ids: string[]) {
  if (!ids.length) return [];
  const data = await yt<{ items?: VideoItem[] }>("videos", {
    part: "snippet,liveStreamingDetails",
    id: ids.join(","),
    maxResults: "50",
  });
  return (data?.items ?? [])
    .map(fromVideo)
    .filter((item): item is YtVideo => Boolean(item));
}

async function fromRss(channelId: string, fresh = false): Promise<YtVideo[]> {
  const res = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
    fresh ? { cache: "no-store" } : { next: { revalidate: 120 } },
  );
  if (!res.ok) return [];
  const xml = await res.text();
  const videos: YtVideo[] = [];
  for (const entry of xml.split("<entry>").slice(1)) {
    const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    if (!id) continue;
    videos.push({
      id,
      title:
        entry.match(/<media:title>([^<]+)<\/media:title>/)?.[1] ||
        entry.match(/<title>([^<]+)<\/title>/)?.[1] ||
        "Sharon gathering",
      publishedAt:
        entry.match(/<published>([^<]+)<\/published>/)?.[1] ||
        new Date().toISOString(),
      thumbnail:
        entry.match(/<media:thumbnail url="([^"]+)"/)?.[1] ||
        `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      live: false,
    });
  }
  return videos;
}

const YT_PAGE_HEADERS = {
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  accept: "text/html,application/xhtml+xml",
  "accept-language": "en-US,en;q=0.9",
  cookie:
    "CONSENT=YES+; SOCS=CAISNQgDEitib3FfaWRlbnRpdHlmcm9udGVuZHVpc2VydmVyXzIwMjMxMTE0LjA2X3AxGgVlbi1VUw",
};

const VIDEO_ID = /^[a-zA-Z0-9_-]{11}$/;

function asVideo(
  id: string,
  title = "Live now",
  publishedAt = new Date().toISOString(),
): YtVideo {
  return {
    id,
    title,
    publishedAt,
    thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    live: true,
  };
}

function extractJsonAssignment(html: string, name: string): unknown | null {
  const needle = `${name} = `;
  const at = html.indexOf(needle);
  if (at < 0) return null;
  const start = at + needle.length;
  if (html[start] !== "{") return null;
  let depth = 0;
  for (let i = start; i < html.length && i - start < 1_500_000; i++) {
    const ch = html[i];
    if (ch === "{") depth += 1;
    else if (ch === "}") {
      depth -= 1;
      if (depth === 0) {
        try {
          return JSON.parse(html.slice(start, i + 1)) as unknown;
        } catch {
          return null;
        }
      }
    }
  }
  return null;
}

function liveFromPlayerData(data: unknown): YtVideo | null {
  if (!data || typeof data !== "object") return null;
  const rec = data as Record<string, unknown>;
  const details = rec.videoDetails as Record<string, unknown> | undefined;
  const micro = rec.microformat as Record<string, unknown> | undefined;
  const renderer = micro?.playerMicroformatRenderer as
    | Record<string, unknown>
    | undefined;
  const broadcast = renderer?.liveBroadcastDetails as
    | Record<string, unknown>
    | undefined;
  const liveNow =
    details?.isLive === true || broadcast?.isLiveNow === true;
  const id = String(details?.videoId ?? "");
  if (!liveNow || !VIDEO_ID.test(id)) return null;
  return asVideo(id, String(details?.title || "Live now"));
}

function videoIdFromText(text: string): string | undefined {
  return (
    text.match(/[?&]v=([a-zA-Z0-9_-]{11})/)?.[1] ||
    text.match(/"videoId"\s*:\s*"([a-zA-Z0-9_-]{11})"/)?.[1] ||
    text.match(/\\u0022videoId\\u0022\s*:\s*\\u0022([a-zA-Z0-9_-]{11})/)?.[1]
  );
}

function findLiveNowInTree(node: unknown, depth = 0): YtVideo | null {
  if (!node || depth > 28) return null;
  if (Array.isArray(node)) {
    for (const item of node) {
      const found = findLiveNowInTree(item, depth + 1);
      if (found) return found;
    }
    return null;
  }
  if (typeof node !== "object") return null;
  const rec = node as Record<string, unknown>;
  if (rec.isLiveNow === true) {
    const id = String(rec.videoId ?? rec.currentVideoId ?? "");
    if (VIDEO_ID.test(id)) {
      const title =
        typeof rec.title === "string"
          ? rec.title
          : String(
              (rec.title as { simpleText?: string } | undefined)?.simpleText ||
                "Live now",
            );
      return asVideo(id, title);
    }
  }
  for (const value of Object.values(rec)) {
    const found = findLiveNowInTree(value, depth + 1);
    if (found) return found;
  }
  return null;
}

async function innertubePlayer(videoId: string): Promise<YtVideo | null> {
  try {
    const res = await fetch(
      "https://www.youtube.com/youtubei/v1/player?prettyPrint=false",
      {
        method: "POST",
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
        headers: {
          "content-type": "application/json",
          "user-agent":
            "com.google.android.youtube/19.47.53 (Linux; U; Android 14) gzip",
        },
        body: JSON.stringify({
          context: {
            client: {
              clientName: "ANDROID",
              clientVersion: "19.47.53",
              androidSdkVersion: 34,
              hl: "en",
              gl: "NG",
            },
          },
          videoId,
        }),
      },
    );
    if (!res.ok) return null;
    return liveFromPlayerData(await res.json());
  } catch {
    return null;
  }
}

async function detectLiveFromChannelPage(
  channel: BroadcastChannel,
): Promise<YtVideo | null> {
  const ids: string[] = [];
  const pages = [
    `https://www.youtube.com/${channel.handle}/live`,
    `https://www.youtube.com/channel/${channel.channelId}/live`,
  ];

  for (const url of pages) {
    try {
      const res = await fetch(url, {
        cache: "no-store",
        redirect: "follow",
        signal: AbortSignal.timeout(8000),
        headers: YT_PAGE_HEADERS,
      });
      if (!res.ok) continue;

      const html = await res.text();
      const decoded = html.replace(/\\u0022/g, '"');
      const fromPlayer =
        liveFromPlayerData(extractJsonAssignment(html, "ytInitialPlayerResponse")) ||
        liveFromPlayerData(
          extractJsonAssignment(decoded, "ytInitialPlayerResponse"),
        ) ||
        findLiveNowInTree(extractJsonAssignment(html, "ytInitialData")) ||
        findLiveNowInTree(extractJsonAssignment(decoded, "ytInitialData"));
      if (fromPlayer) return fromPlayer;

      for (const id of [
        videoIdFromText(res.url),
        videoIdFromText(decoded),
      ]) {
        if (id && !ids.includes(id)) ids.push(id);
      }

      const liveMarker =
        /"isLiveNow"\s*:\s*true/.test(decoded) ||
        decoded.includes("BADGE_STYLE_TYPE_LIVE_NOW");
      const markerId = videoIdFromText(decoded);
      if (liveMarker && markerId) {
        const confirmed = await innertubePlayer(markerId);
        return confirmed ?? asVideo(markerId);
      }
    } catch {
      continue;
    }
  }

  for (const id of ids) {
    const live = await innertubePlayer(id);
    if (live) return live;
  }

  return null;
}

async function detectLiveFromFeed(channelId: string): Promise<YtVideo | null> {
  const feed = await fromRss(channelId, true);
  const checks = await Promise.all(
    feed.slice(0, 8).map((video) => innertubePlayer(video.id)),
  );
  return checks.find((video): video is YtVideo => Boolean(video)) ?? null;
}

export async function resolveLiveBroadcast(
  channel: BroadcastChannel = familyChannel(),
): Promise<YtVideo | null> {
  const apiHits = await searchEvent(channel.channelId, "live", 1);
  if (apiHits[0]) return apiHits[0];

  const [pageLive, feedLive] = await Promise.all([
    detectLiveFromChannelPage(channel),
    detectLiveFromFeed(channel.channelId),
  ]);
  return pageLive ?? feedLive;
}

export async function isChannelLive() {
  return Boolean(await resolveLiveBroadcast());
}

export async function getChannelBroadcasts(
  channel: BroadcastChannel = familyChannel(),
): Promise<ChannelBroadcasts> {
  const [live, completed] = await Promise.all([
    resolveLiveBroadcast(channel),
    searchEvent(channel.channelId, "completed", 16),
  ]);

  let previous = completed.filter((video) => video.id !== live?.id);

  if (previous.length === 0) {
    const feed = await fromRss(channel.channelId);
    const details = await videosById(feed.map((video) => video.id));
    const catalog = details.length ? details : feed;
    previous = catalog.filter((video) => !video.live && video.id !== live?.id);
  }

  return { live, previous };
}
