import { getParish, parishBroadcastChannel } from "@/lib/parishes";
import { resolveLiveBroadcast } from "@/lib/youtube";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("parish");
  const parish = slug ? getParish(slug) : undefined;
  if (slug && !parish) {
    return Response.json(
      { live: false, id: null },
      { status: 404, headers: { "cache-control": "no-store, max-age=0" } },
    );
  }
  const broadcast = await resolveLiveBroadcast(
    parish ? parishBroadcastChannel(parish) : undefined,
  );
  return Response.json(
    { live: Boolean(broadcast), id: broadcast?.id ?? null },
    {
      headers: {
        "cache-control": "no-store, max-age=0",
      },
    },
  );
}
