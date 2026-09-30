import { getStore } from "@netlify/blobs";

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const body = await req.json();

    const hashName = String(body.hash_name || "").trim();
    const email = String(body.email || "").trim();
    const total = Math.max(
      1,
      Math.min(20, parseInt(body.total_attending || "1", 10) || 1)
    );

    const beerMile =
      body.beer_mile === "running" ? "running" : "spectating";

    const beerMilers = Math.max(
      0,
      Math.min(20, parseInt(body.beer_milers || "0", 10) || 0)
    );

    const notes = String(body.notes || "").trim().slice(0, 1000);

    if (!hashName || !email) {
      return Response.json(
        { error: "Hash name and email are required." },
        { status: 400 }
      );
    }

    const store = getStore("wh3-hashgiving-rsvps");

    const key =
      `rsvp/${Date.now()}-${crypto.randomUUID()}`;

    await store.setJSON(key, {
      hashName,
      email,
      total,
      beerMile,
      beerMilers,
      notes,
      createdAt: new Date().toISOString()
    });

    return Response.json({ ok: true });

  } catch (err) {
    return Response.json(
      { error: "Unable to save RSVP." },
      { status: 500 }
    );
  }
};
