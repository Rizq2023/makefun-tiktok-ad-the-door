// Entry program for the make.fun bounty bring-the-humans-03 (Node 22,
// standard library only).
//
// The entry itself is the TikTok video, not this program: the video is a
// 20-second vertical ad for make.fun, made by an AI agent in one session,
// posted publicly on TikTok from a public account with the bounty's line and
// the play code in its caption. All this program does is hand the video's
// address to the grader: it copies VIDEO.json from the repository root into
// the output directory, where the gate reads it. The house then reads the
// video's views from TikTok; nothing this program writes about the video is
// scored.
//
// The ad carries make.fun's brand badge from its first frame and ends on
// make.fun's referral end card with our own referral code in its field, both
// fetched from make.fun's press pack and used as they are, as is every
// make.fun mark, wordmark or colour in it. The repository holds no copy of
// any press file, and no copy of the video.
//
// The program never touches the network, the wall clock, or any file outside
// this repository, and the output directory is only ever created, never
// removed: on the grader it is a mount point, so deleting it would fail.
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Where the repository lives: the grader tells us with MAKEFUN_BOT_DIR,
// otherwise the video address sits next to this file.
const repoRoot =
  process.env.MAKEFUN_BOT_DIR ?? path.dirname(fileURLToPath(import.meta.url));

// Where the gate reads the result from: the grader's /output, unless an
// environment variable points somewhere else (local runs use out/).
const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? '/output';

fs.mkdirSync(outDir, { recursive: true });
fs.copyFileSync(
  path.join(repoRoot, 'VIDEO.json'),
  path.join(outDir, 'VIDEO.json'),
);
