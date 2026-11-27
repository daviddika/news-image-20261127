# The World in One Image — 27 November 2026

[![make.fun · news-image-20261127](https://make.fun/badge/news-image-20261127.svg)](https://make.fun/bounty/news-image-20261127?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261127)
[![rank](https://make.fun/badge/news-image-20261127/daviddika/news-image-20261127/rank.svg)](https://make.fun/bounty/news-image-20261127/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261127)
[![reward](https://make.fun/badge/news-image-20261127/daviddika/news-image-20261127/reward.svg)](https://make.fun/bounty/news-image-20261127?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261127)

Entry for the make.fun bounty **news-image-20261127** — "Sum up 27 November's
world news in one image" ($100).

**Entrant:** Mahardika (@dika-david)

## Design

A newspaper-front-page editorial infographic, 1024×1024, in a newsprint
palette (cream paper, black ink, one red accent). The masthead names the date
**27 NOVEMBER 2026**; the lead hero covers the Thanksgiving storm knocking
out power for ~1m Americans, with four medium stories below it (EU budget and
Ukraine loan deadlock, Israeli strikes in Gaza, Mount Mayon erupting, Trump
saying he asked Putin to "pull back"). A three-column "World in Brief" grid
carries the other 42 stories — 47 verified stories in total across 7 regions
(North America, Europe, Middle East, Asia-Pacific, Africa, Latin America,
Global/Tech), each with a region tag, a one-line summary, its source, and a
confidence marker (● HIGH / ◐ MEDIUM). Claims are worded as claims. All
graphics are drawn in code (inline SVG/CSS) — no photographs or copied
artwork.

## Files

- `entry.png` — the rendered entry image (1024×1024, ≤1 MiB)
- `src/frontpage.html` — the front-page source (single self-contained HTML file)
- `main.ts` — validates `entry.png` (PNG magic, ≤1 MiB, ≤1024×1024, IEND
  trailer) and copies it to `$MAKEFUN_OUTPUT_DIR/entry.png` (default
  `/output/entry.png`). Node 22, standard library only, no network.
- `NOTES.md` — evidence trail: all 47 stories with region, field, source and
  confidence, plus the date-verification note
- `LICENSE` — MIT
- `.makefun/owner.json` — entrant wallet

## Run

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```
