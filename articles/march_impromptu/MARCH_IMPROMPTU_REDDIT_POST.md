# After 25 Failed Enigma Attempts, Here's Why the March Impromptu Cipher Was Unsolvable: Everyone Asked the Wrong Question

**TL;DR**: The March Impromptu cipher isn't encrypted text—it's a geographic navigation system using Nazi SS runes to encode meter-based coordinates. For 13 years, cryptographers tried to decrypt TEXT with Enigma machines. They were solving the wrong problem. The cipher is actually a steganographic treasure map disguised as a German folk song, leading to a military compound in Mittenwald, Bavaria—where Nazi treasure was documented arriving in April 1945. My solution converges within 350 meters of an independent 2015 solution attempt.

---

## The Mystery

In 2012, Dutch journalist Karl Hammer published a peculiar piano score that had allegedly spent 67 years hidden in a military chaplain's papers. The document—a page from "Marsch-Impromptu"—contained typed German phrases above the music, handwritten runic symbols disguised as notes, and a cryptic stamp reading "1ø 050 16 2 19."

According to the provenance story, this cipher encoded the location of Nazi treasure—diamonds and gold—buried in Bavaria in April 1945. The treasure allegedly includes Hitler's personal diamond collection, nicknamed **"Tears of the Wolf"**, entrusted to Colonel Franz Wilhelm Pfeiffer at the Wehrmacht Mountain Warfare School in Mittenwald just days before American forces liberated the area.

**For 13 years, the cipher remained unsolved.**

Dutch filmmaker Leon Giesen conducted three excavations in 2013, finding "unidentified metals" but not the treasure. Dutch violin maker Cyril Whistler claimed to have solved it in 2015, presenting findings to the Mittenwald mayor and German Defense Minister—but no excavation occurred. Cryptographers attempted dozens of Enigma machine configurations.

All failed.

**I believe I've cracked it.** And the reason everyone else failed? They were solving the wrong problem entirely.

---

## The Document

![Original March Impromptu cipher score - the unsolved puzzle](./original_score.webp)

Let me describe exactly what we're looking at:

**Physical Format:**
- Title: "Marsch-Impromptu" (March Impromptu)
- Piano sheet music, SECONDO part
- Page 40, Collection Litolff No. 1189
- Footer: "Enden der Tanz" (End of the Dance)
- Stamp: "1ø 050 16 2 19"

**Encoded Elements:**

**Five German Phrases** (typed above the staves):
1. "Wo Matthias Die Saiten Streichelt" — "Where Matthias plucks the strings"
2. "Edelweiß Über Schwarzwald" — "Edelweiss over Black Forest"
3. "Kein Wasser Kalt" — "No cold water"
4. "Predigtstuhl Kreuz u. Kranz" — "Pulpit cross and wreath"
5. "Nørdest Die Krøne" — "Northeast the crown"

**18 Armanen Runes** — Handwritten symbols disguised as musical notes, positioned at specific heights (1-9) on the staves.

**Colored Markers in Phrase 4** — Blue rectangles and bars at positions [7, 8, 1, 3]

**A Handwritten Cursive "M"** — Between the staves in Phrase 4

At casual glance, this looks like perfectly normal sheet music with lyrics—a German folk song. That's the point. That's the steganography.

---

## Why Everyone Failed: The Enigma Trap

### The Methodology Everyone Used (2012-2025)

**Step 1**: Identify the runes as **Armanen Futharkh**—the 18-rune system created by Guido von List in 1902 and adopted by Nazi SS organizations. ✓ Correct.

**Step 2**: Map each rune's vertical position on the musical staff (1-9 from bottom to top). ✓ Also correct.

**Step 3**: Use position numbers to extract letters from the German phrases. For example: rune at position 3 → extract 3rd letter of phrase.

**Step 4**: Concatenate all extracted letters: "WAOALEEKESNDGRNDOI" (18 letters)

**Step 5**: Attempt Enigma machine decryption with various configurations.

### What They Tried

Over 13 years, researchers tested **25+ Enigma configurations**:
- Rotor orders: I-II-III, III-II-I, II-IV-V, I-V-III
- Ring settings from stamp: [16, 2, 19] and variations
- Starting positions: IOO, CFC, AAO, DGB, AAA
- Various plugboard combinations

**Every single attempt produced gibberish.** No German words. No coherent message.

### The Logic That Trapped Them

It seemed so reasonable:
- Nazi cipher → Enigma machine (standard Wehrmacht cryptography)
- Stamp "16 2 19" → Looks like ring settings
- Armanen runes → SS connection → Military-grade encryption
- 18 letters → Plausible message length

So they kept trying MORE configurations. Different rotors. Different settings.

**For thirteen years.**

### The Fundamental Error

Here's what nobody asked: **"What if this isn't text encryption at all?"**

Everyone assumed rune positions extract LETTERS that form CIPHERTEXT requiring DECRYPTION revealing GERMAN PLAINTEXT containing DIRECTIONS.

**But what if the rune positions themselves ARE the directions?**

---

## The Breakthrough: It's a Map, Not a Message

### The Impossible Symmetry

The breakthrough came from a simple observation everyone missed:

**Phrases 1 and 5 produce identical rune position patterns: [1, 4, 2, 9]**

The probability of this occurring randomly? **0.015%** (1 in 6,561)

If you're extracting letters to form ciphertext, why would the first and last phrases yield identical patterns? That's not how encrypted messages work.

**But it IS how navigation routes work.**

You start somewhere, travel a route, and the symmetry signals intentional design. The numbers aren't letter extractors—**the numbers themselves are the data.**

![Annotated score showing rune positions, meter values, and the decoded navigation system](./score_with_code.webp)

### The Geographic Interpretation

Now look at the German phrases—really look:

**"Wo Matthias Die Saiten Streichelt"** — "Where Matthias plucks the strings"
- There's a **Matthias Klotz statue** in Mittenwald—a famous violin maker, statue erected 1890. It's THE landmark of the town.

**"Edelweiß Über Schwarzwald"** — "Edelweiss over Black Forest"
- Edelweiss grows at **1,800-3,000m** on rocky limestone. "Schwarzwald" = dark forest = below tree line. "Edelweiss OVER Black Forest" = **above the tree line**.

**"Predigtstuhl Kreuz u. Kranz"** — "Pulpit cross and wreath"
- **Predigtstuhl** is an actual mountain near Mittenwald (1,920m peak) with a summit cross. Real, verifiable.

**"Nørdest Die Krøne"** — "Northeast the crown"
- A **directional bearing**. Note the ø symbols.

These aren't random phrases for letter extraction. They're **waypoint descriptions along a navigation route.**

### The Hypothesis

**What if rune positions encode METER OFFSETS?**

- Position [1, 4, 2, 9] → Concatenate → **1,429 meters**
- Position [4, 3, 6] → Concatenate → **436 meters**

The phrases describe WHERE you are. The positions tell you HOW FAR to go.

---

## The "M" Marker: The Rosetta Stone

### The Only Standard Letter

Here's something critical that everyone missed:

**The handwritten "M" in Phrase 4 is the ONLY standard Latin alphabet letter added to the entire document.**

Inventory of added elements:
- 18 Armanen runes (symbolic characters)
- 3-4 geometric markers (shapes)
- **1 letter: "M"**

If this cipher is purely runic, why add exactly ONE standard letter? And why write it in flowing cursive—signature style—not simple block print?

### Triple Function Design

The "M" serves **three simultaneous purposes**:

**1. Unit Label: "Meters"**
This tells the decoder that position numbers represent metric distances. Without this, you might think they're feet, yards, or abstract values. The "M" makes the system operational.

**2. Possible Authentication: Martin Bormann**
Martin Bormann—head of Nazi Party Chancellery and Hitler's private secretary—consistently signed official documents "M. Bormann" from 1937-1944. A February 15, 1944 letter to Himmler (exactly one year before the cipher date) exhibits this signature format.

The "M" may be Bormann's authentication mark, confirming official provenance to the intended recipient—Franz Xaver Schwarz, the Nazi Party accountant who worked directly with Bormann.

**3. Operational Security**
A single "M" maintains plausible deniability. If captured:
- Enemies see: Generic letter (meaningless)
- Recipient sees: Bormann's mark (authentication)
- Decoder sees: "Meters" (functional instruction)

Writing "Martin Bormann" would immediately flag the document. A simple "M" preserves the innocent sheet music cover.

### Why Cursive, Not Block Print?

Compare the "M" to the printed "mf" (mezzo-forte) elsewhere in the score. That's how you write a functional musical abbreviation—simple, utilitarian.

The "M" is styled like a **signature initial**, not notation. This supports the dual-purpose interpretation: it functions as "meters" while also serving as Bormann's mark.

---

## The Complete Solution: Step-by-Step Navigation

### Starting Point

**Matthias Klotz Statue**, St. Peter & Paul Church, Mittenwald
- Coordinates: 47.4423°N, 11.2622°E
- Elevation: ~900m

The first phrase literally says "Where Matthias plucks the strings." This is unambiguous.

### The Route

**Phrase 1: [1, 4, 2, 9] = 1,429 meters NORTH**
- New position: 47.4552°N, 11.2622°E
- Elevation: ~1,300m
- Heading into Karwendel mountains

**Phrase 2: [4, 3, 6] = 436 meters NORTH**
- "Edelweiß Über Schwarzwald"
- New position: 47.4591°N, 11.2622°E
- Elevation: ~1,500-1,800m
- **Above tree line** — Geographic description validates route

**Phrase 3: [1, 2, 7, 4] = 1,274 meters EAST**
- "Kein Wasser Kalt"
- New position: 47.4591°N, 11.2785°E
- Elevation: ~1,600m

**Phrase 4: [4, 6, 2] = 462 meters EAST**
- "Predigtstuhl Kreuz u. Kranz"
- New position: 47.4591°N, 11.2845°E
- Near Predigtstuhl mountain with summit cross
- **Markers here: [7, 8, 1, 3] and "M"**

**Phrase 5: [1, 4, 2, 9] = 1,429 meters NORTH**
- "Nørdest Die Krøne"
- New position: 47.4720°N, 11.2845°E
- High Karwendel mountains
- **Identical to Phrase 1** (intentional symmetry)

### The Final Approach: Reversal

The fifth phrase contains **ø symbols** ("Nørdest Die Krøne"). In cryptographic notation, ø often signals negation or reversal.

The markers in Phrase 4 read [7, 8, 1, 3]. Reversed: [3, 1, 8, 7] = **3,187 meters**.

Direction: Southwest (~200° bearing—reverse of "northeast")

From the high mountain position, travel 3,187m down toward the valley.

### Final Destination

**Coordinates**: 47.4450°N, 11.2704°E
**Location**: Karwendel-Kaserne military compound area
**Distance to compound center**: 354 meters
**Feature**: Near railway buffer stop

This is where Nazi treasure was documented arriving in April 1945.

---

## Independent Verification: The Whistler Convergence

In 2015, Dutch violin maker Cyril Whistler claimed to have solved the cipher after two years of study. He presented his findings to the Mittenwald mayor and German Defense Minister.

His claimed location: **"13 meters from the military fence at the old railway buffer stop."**

Whistler never published his methodology. Yet his claimed location and my independently-derived solution converge on the **same ~350-meter zone** around Karwendel-Kaserne.

**Two completely independent approaches. Same target area.**

The probability of this happening by chance is extremely low. Either:
1. We're both right (convergent validation)
2. We both made the same error (possible but the methodologies appear different)
3. One influenced the other (I found Whistler's claim AFTER completing my analysis)

I consider this convergence strong supporting evidence.

---

## Evidence Assessment: What I'm Confident About

### HIGH CONFIDENCE (75-85%)

**The cipher encodes geographic data, not text.**
- The symmetry (0.015% random chance) proves intentional design
- German phrases describe real, verifiable landmarks
- 13 years of Enigma failure suggests wrong paradigm
- Geographic interpretation explains ALL cipher elements

**The runes are definitively Armanen Futharkh.**
- GIBOR rune exists ONLY in Armanen system
- 18 runes match Armanen count (not Elder Futhark's 24)
- This is verifiable fact, not interpretation

**Matthias Klotz statue is the starting point.**
- Phrase 1 literally says "Where Matthias plucks the strings"
- Only Matthias Klotz statue exists in Mittenwald
- This was also Leon Giesen's conclusion in 2013

### MODERATE CONFIDENCE (55-70%)

**The route directions (N, N, E, E, N) are correct.**
- Based on phrase content analysis
- "Nørdest" clearly indicates north/northeast
- But directional assignment to other phrases is interpretive

**Final location is within 500m of target.**
- Coordinate calculations are mathematically sound
- But depend on assumptions about direction assignment
- Whistler convergence supports general area

**The "M" means "Meters."**
- Makes the system functional
- Explains why only ONE letter was added
- Most parsimonious interpretation

### LOWER CONFIDENCE (40-55%)

**The "M" is Bormann's authentication mark.**
- Historically plausible (Bormann controlled finances)
- Signature style supports it
- But requires forensic verification to confirm

**The reversal interpretation ([3,1,8,7] = 3,187m SW) is correct.**
- The ø symbols suggest reversal operation
- Mathematically produces sensible result
- But this is the most speculative part of the solution

### HONEST UNCERTAINTY

**Treasure still exists at location: 15-25%**

Even if my solution is correct:
- Could have been recovered already (1945-2025)
- Could have been found during construction
- Could never have existed as described
- Whistler or German government may have it

**Document is authentic 1945 artifact: 50-60%**

The 67-year provenance gap is problematic. Could be:
- Genuine (chaplain story is true)
- Sophisticated hoax with accurate period details
- Post-war creation using real Nazi methods

---

## Why This Solution Works

### It Explains the Failures

For 13 years, Enigma decryption produced gibberish because **there's no encrypted text to decrypt.** The positions ARE the data—meter offsets for navigation.

### It Explains the Symmetry

Phrases 1 and 5 yielding [1,4,2,9] isn't coincidence—it's intentional navigation design. Text ciphers don't do this. Geographic routes do.

### It Explains the Phrases

The German text isn't random substrate for letter extraction. Each phrase describes a waypoint:
- Matthias Klotz statue (starting point)
- Above tree line (elevation marker)
- Predigtstuhl mountain (landmark reference)
- Northeast bearing (direction)

### It Explains the "M"

The only standard letter added tells you the unit system: meters. It's the key that makes everything else functional.

### It Converges with Independent Research

Whistler spent 2 years on this. I spent weeks. We reached the same ~350m zone using apparently different methods. That's not coincidence.

---

## The Steganographic Masterpiece

The cipher's brilliance isn't complex encryption—it's **sophisticated concealment**.

**Layer 1: Casual Observer**
Sees piano music with German lyrics. Thinks: "Folk song, someone's practicing." Moves on.

**Layer 2: Music Expert**
Notices odd note heads (runes) and strange markers. Thinks: "Unusual notation, maybe period-specific." Might investigate further but lacks cryptographic training.

**Layer 3: Cryptographer**
Recognizes runes, assumes text encryption, attempts Enigma. Fails for 13 years because the paradigm is wrong.

**Layer 4: Correct Interpretation**
Recognizes this isn't encrypted text but geographic encoding. The "message" was never hidden IN the cipher—the cipher IS the message.

The sophistication isn't in making it hard to decrypt. It's in making everyone try to decrypt something that was never encrypted.

---

## What I'm Asking

I'm posting this because I want critical eyes on this analysis.

**Cryptographers**: Does the geographic interpretation make sense? Is there a flaw in the logic?

**Historians**: Is the historical context accurate? Does the Bormann connection hold up?

**Mathematicians**: Are my coordinate calculations correct? Is the probability analysis sound?

**German speakers**: Do the phrase translations work? Am I missing linguistic nuance?

**Skeptics**: What am I missing? Where could I be wrong?

I've tried to be rigorous and honest, including acknowledging uncertainties. But I'm one person. I want this examined.

---

## Remaining Questions

**Why no excavation after Whistler's 2015 presentation?**

Possibilities:
- German government doesn't believe the solution
- Legal/bureaucratic barriers (military property, Nazi gold ownership)
- Treasure was quietly recovered
- Whistler was wrong (but then why do we converge?)

**Is the document authentic?**

The 67-year gap before publication is suspicious. Forensic analysis (ink dating, paper composition) could resolve this but hasn't been done publicly.

**Could the treasure have been recovered already?**

Absolutely. 80 years is a long time. Construction, renovation, previous expeditions, or government recovery could all explain empty ground.

**What would prove this solution?**

Ground-penetrating radar survey at the coordinates, forensic document authentication, or (unlikely) excavation.

---

## Conclusion

After 13 years of failed Enigma decryption attempts, I believe I've identified why everyone failed and what the cipher actually encodes.

**The March Impromptu Code isn't encrypted text—it's a geographic navigation system disguised as a German folk song.**

The cipher uses:
- Armanen runes positioned at specific heights to encode meter offsets
- German phrases describing waypoints along a mountain route
- A handwritten "M" serving as unit label and possible authentication
- Multi-layer steganography making it appear as innocent sheet music

The route leads from the Matthias Klotz statue in Mittenwald, through the Karwendel mountains, to the Karwendel-Kaserne military compound—where Nazi treasure was documented arriving in April 1945.

**I could be wrong.** The exact coordinates might be off. The treasure might be gone. The document might be a hoax.

But the SYSTEM makes sense. The GEOGRAPHY validates. The HISTORY aligns. And an independent solution CONVERGES on the same location.

**The solution was always hidden in plain sight. Everyone was just solving the wrong problem.**

---

*"Enden der Tanz"* — End of the Dance

---

## Technical Appendix

### Rune Position Summary

| Phrase | Positions | Distance | Direction |
|--------|-----------|----------|-----------|
| 1 | [1,4,2,9] | 1,429m | North |
| 2 | [4,3,6] | 436m | North |
| 3 | [1,2,7,4] | 1,274m | East |
| 4 | [4,6,2] | 462m | East |
| 5 | [1,4,2,9] | 1,429m | North |
| Final | [3,1,8,7] | 3,187m | Southwest |

### Coordinate Progression

| Waypoint | Latitude | Longitude |
|----------|----------|-----------|
| Start (Klotz statue) | 47.4423°N | 11.2622°E |
| After Phrase 1 | 47.4552°N | 11.2622°E |
| After Phrase 2 | 47.4591°N | 11.2622°E |
| After Phrase 3 | 47.4591°N | 11.2785°E |
| After Phrase 4 | 47.4591°N | 11.2845°E |
| After Phrase 5 | 47.4720°N | 11.2845°E |
| **Final** | **47.4450°N** | **11.2704°E** |

### Key Armanen Runes Identified

- **GIBOR** — Exists ONLY in Armanen system (smoking gun)
- **YR** — Armanen-specific downward variant
- **SIG** — SS lightning bolt symbol
- **ODAL** — Nazi "blood and soil" symbol

---

**Research Period**: December 2025 - January 2026

**Methodology**: Independent cryptanalysis combining geographic validation, historical research, handwriting analysis, and operational security assessment.

**Building on**: Karl Hammer (2012 publication), Leon Giesen (2013 expeditions), Cyril Whistler (2015 claimed solution)

**What I got wrong that they got right**: Giesen correctly identified Matthias Klotz as starting point. I initially dismissed this.

**What I got right that they got wrong**: The runes encode distances, not letters for text decryption.

---

*Thanks for reading. I know this is long, but I wanted to be thorough. Happy to answer questions.*
