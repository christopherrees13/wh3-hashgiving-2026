import { getStore } from "@netlify/blobs";

export default async () => {
  try {
    const store = getStore("wh3-hashgiving-rsvps");
    const { blobs } = await store.list({ prefix: "rsvp/" });

    for (const { key } of blobs) {
      await store.delete(key);
    }

    return Response.json({
      ok: true,
      deleted: blobs.length
    });

  } catch (err) {
    return Response.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
};
