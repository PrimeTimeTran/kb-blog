# From 2 minutes to 25-minute timeouts. 🚀

I hit a brick wall with my Vercel deployments.

My build was running perfectly locally, but once pushed to production, the Vercel agent would hang at "Deploying outputs" for 25 minutes before failing.

The culprit? 1,500 tiny SVG icon files.

Turns out, Vercel’s build agent isn't just uploading files—it’s performing an atomic sync of every single inode. By flooding my `public/` directory with 1,500+ files, I was causing the manifest generation to choke.

The fix? **I ditched the file-per-icon approach and built an SVG Sprite.**

The results were immediate:
✅ Reduced build times from "failing at 25m" to "finishing in under 60s."
✅ A 1,250% improvement in deployment efficiency.
✅ Eliminated the network waterfall for my users.

If your Vercel builds are hanging at the finish line, check your `public/` folder before you blame your code. Sometimes, the most "modern" performance trick is an old-school sprite sheet.

[Link: Read the full architectural deep dive on my blog]

#webdev #vercel #frontend #performance #codingtips
