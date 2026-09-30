import { getStore } from "@netlify/blobs";

export default async () => {
  try {
    const store = getStore("wh3-hashgiving-rsvps");
    const { blobs } = await store.list({ prefix: "rsvp/" });

    const rows = (await Promise.all(
      blobs.map(async ({ key }) => {
        try {
          return await store.get(key, { type: "json" });
        } catch {
          return null;
        }
      })
    )).filter(Boolean);

    rows.sort((a, b) =>
      String(a.createdAt).localeCompare(String(b.createdAt))
    );

    return Response.json({
      headcount: rows.reduce(
        (n, r) => n + (Number(r.total) || 1), 0
      ),
      attendees: rows.map(r => ({
        hashName: r.hashName,
        beerMile: r.beerMile,
        total: r.total
      }))
    }, {
      headers: { "Cache-Control": "no-store" }
    });

  } catch (err) {
    return Response.json({
      headcount: 0,
      attendees: []
    }, {
      headers: { "Cache-Control": "no-store" }
    });
  }
};
