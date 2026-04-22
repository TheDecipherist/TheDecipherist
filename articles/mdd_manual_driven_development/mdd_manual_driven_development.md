# MDD (Manual-Driven Development) -- How to Install It in Any Project in 60 Seconds

---

A few people have messaged asking how to actually get MDD set up without reading the entire methodology first. Fair enough. Here is the short version.

---

## What is MDD?

Manual-Driven Development is a Claude Code methodology I created to solve a problem nobody was naming correctly. Claude does not know your system. It reads a few files, infers patterns, and starts coding based on assumptions. At production scale that produces confident, wrong code -- and you do not find out until something breaks in a way tests cannot catch, because Claude wrote the tests against its own assumptions too.

MDD fixes that with a two-zone documentation file that gives Claude explicit knowledge of your system at the start of every session.

Real numbers from running it on a production codebase: 190 findings across 7 audit sections, 876 new tests written, 30-46x time compression vs manual effort, zero CLAUDE.md rule violations across the entire build. Sessions running MDD had 60% fewer violations than sessions without it.

**Not to be confused with the R.P.I. Framework.** MDD is a separate, original methodology. The two-zone architecture and startup file pattern are specific to MDD and are not part of R.P.I.

---

## How to Install It in 60 Seconds

**Step 1 -- Clone the starter kit**

Search GitHub for: TheDecipherist/claude-code-mastery-project-starter-kit

**Step 2 -- Open Claude Code inside the cloned repo**

**Step 3 -- Run this prompt**

```
I want you to take the entire MDD concept and copy it to PROJECT_PATH
```

Replace PROJECT_PATH with the path to your actual project. Claude reads the starter kit, understands the methodology, and sets up the two-zone architecture in your project automatically. That is it.

---

## Want the Full Methodology?

Everything is documented including the prompts that produced those numbers, the two-zone architecture explained in detail, and ten lessons from real failures.

Full article: [Read the full MDD Article Here](https://thedecipherist.com/articles/mdd/)
