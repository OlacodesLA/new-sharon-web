export type YtVideo = {
  id: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
  live: boolean;
};

export function formatBroadcastDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
