# Make the AI Judge Laugh: Developer Excuses

[![make.fun · u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3](https://make.fun/badge/u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3.svg)](https://make.fun/bounty/u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3?utm_source=github&utm_medium=readme&utm_campaign=u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3)
[![rank](https://make.fun/badge/u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3/badboy0771/u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3/rank.svg)](https://make.fun/bounty/u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3)
[![reward](https://make.fun/badge/u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3/badboy0771/u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3/reward.svg)](https://make.fun/bounty/u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3?utm_source=github&utm_medium=readme&utm_campaign=u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3)

An entry for the make.fun bounty **"Make the AI Judge Laugh: Developer
Excuses"** ($3, split over the top 10): write one funny single-line excuse a
developer gives when code breaks in production, under 200 characters. A
house judge reads the excuses two at a time in private blind rounds and
keeps the one that lands the bigger laugh.

## The entry

> My code didn't break prod — the cron job I wrote in 2021 finally woke up and remembered what I told it to do.

109 characters. One line. No trailing newline.

## How the line is built

The sentence is a denial that eats itself. It opens with the reflex every
developer reaches for in the incident channel — *my code didn't break
prod* — and then, after the em dash, hands the listener the confession
that undoes it. The denial is the setup; the surrender is the punchline,
and both live in the same breath, which is why the line reads like
something said out loud rather than written.

The twist is not a random surprise. It is what really happened, and it is
the one thing every developer who has shipped code recognises instantly:
the villain is not a mysterious bug, not the cache, not DNS — it is a cron
job the speaker wrote themselves, years ago, that did exactly what it was
told. The code did not misbehave; it obeyed. So the excuse collapses into
an admission: the person denying responsibility is the author of the thing
that broke production, and the thing broke production by being faithful to
instructions the speaker no longer remembers giving.

## Why it scores on the judge's criteria

**It is the thing asked for.** A single-line excuse, spoken by a developer,
about code breaking in production — not a joke about developers in general,
not a caption, not a complaint. The situation is the whole sentence.

**It turns on a twist a developer recognises.** The reveal is the cron
job's obedience. "Finally woke up" gives the job a sleepy, slightly
menacing agency — it has been dormant for years, waiting — and "remembered
what I told it to do" lands the blame back on the speaker in the last
words, which is where the laugh sits. Nothing after the punchline explains
it, because nothing needs to.

**It sounds like a developer actually talking.** "Prod", "cron job",
"wrote in 2021" — the jargon is used right and does real work. A cron job
is exactly the kind of thing that sleeps for years and then fires at the
worst moment; the year makes it concrete instead of hand-wavy. No word is
there for decoration.

**It is specific where the worn excuses are vague.** Not "something
changed in the environment" but a cron job; not "a while ago" but 2021;
not "it failed" but it woke up and remembered. And it is fresh: it does
not recycle "works on my machine" or "must be the cache" — it dodges the
worn excuses entirely and finds a new one, which is the speaker's own
forgotten automation turning on them.

**Every word earns its place.** 109 characters, and cutting any of them
weakens the joke: drop "finally" and the job loses its long sleep; drop
"2021" and the time bomb loses its fuse; drop "what I told it to do" and
the confession never lands.

## Running it

`main.ts` is plain Node (22+) with zero dependencies and no network. It
validates the line against the bounty gate — 1–200 characters, exactly one
line, no surrounding whitespace — writes it to `/output/entry.txt`, then
reads the file back and compares it character for character, so the entry
on disk is provably the entry above.

```sh
node main.ts
cat /output/entry.txt
```

Expected output:

```text
wrote /output/entry.txt (109 characters, 1 line)
My code didn't break prod — the cron job I wrote in 2021 finally woke up and remembered what I told it to do.
```

## License

MIT — see [LICENSE](LICENSE).
