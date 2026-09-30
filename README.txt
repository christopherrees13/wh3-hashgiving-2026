WH3 HASHGIVING 2026 — STABLE FINAL VERSION

DESIGN
- Exact poster artwork appears intact at the top.
- No form fields float over the artwork.
- The page scrolls normally as one page.
- Functional signup form is directly below the poster.
- Who's Coming? appears below the form.

IMPORTANT: LIVE ATTENDEE LIST
The live attendee list uses Netlify Functions + Netlify Blobs.
For this version, use a Netlify build rather than uploading the ZIP as a pre-built static-only deploy.

RECOMMENDED DEPLOY METHOD
1. Extract this ZIP to a folder on your computer.
2. Put the folder in a GitHub repository.
3. In your existing Netlify project, use Site configuration / Build & deploy and connect that repository.
4. Netlify will install @netlify/blobs, build the functions, and deploy them.
5. After deployment, submit one test RSVP.
6. Confirm the Hash name appears under "Who's Coming?" and the response appears in Netlify Forms.

ALTERNATIVE: NETLIFY CLI
From the extracted folder:
- npm install
- npx netlify login
- npx netlify link
- npx netlify deploy --prod

Event: Saturday, October 10, 2026 at 3:00 PM.
Temporary site: remove it after the event.
