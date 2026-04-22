# The Beale Ciphers: A Complete Research Compendium

## Overview

The Beale Ciphers are a set of three ciphertexts, first published in 1885 by James B. Ward in a pamphlet titled *The Beale Papers*. They allegedly describe the location and contents of a treasure buried in Bedford County, Virginia, by a man named Thomas Jefferson Beale and approximately 30 associates in the early 1820s. The treasure — gold, silver, and jewels accumulated during an expedition to the American Southwest — was reportedly hidden in a vault roughly six feet underground, about four miles from Buford's Tavern.

Only one of the three ciphers has ever been solved. The mystery of the remaining two, and the question of whether the entire affair is genuine or an elaborate hoax, has captivated cryptographers, treasure hunters, and historians for well over a century.

---

## Part I: The Narrative

### The Story as Told by Ward (1885)

According to the pamphlet, the story begins in the winter of 1820 when Thomas Jefferson Beale first appeared at the Washington Hotel in Lynchburg, Virginia, operated by Robert Morriss. Beale was described as a striking man of about six feet tall, dark complexion, and black eyes and hair. He stayed at the hotel for several months before departing westward.

In January 1822, Beale returned and entrusted Morriss with a locked iron box, requesting that he keep it safely until called for. Before departing again, Beale left two letters (dated January 4 and 5, 1822) explaining the nature of the box's contents: three cipher papers, a set of instructions, and the promise that a key to the ciphers would be mailed from St. Louis.

The key never arrived. Beale and his party were never heard from again.

Morriss waited the instructed ten years, then additional years beyond that, before finally opening the box. Inside he found:

- **Cipher No. 1** — allegedly describing the exact location of the vault
- **Cipher No. 2** — describing the contents of the vault
- **Cipher No. 3** — listing the names and residences of the 30 party members and their next of kin

Morriss spent decades attempting to decode the ciphers without success. Near the end of his life, he confided the papers to a friend — identified by Ward only as "the author" — who eventually cracked Cipher No. 2 using the Declaration of Independence as a key.

### Beale's Expedition

According to Beale's letter, the expedition began in April 1817, when a party of roughly 30 men departed Virginia for St. Louis, Missouri, and ultimately Santa Fe, then part of the Spanish frontier. They organized themselves into a military-style company and elected Beale as their captain.

In early 1818, a sub-party hunting north of Santa Fe discovered gold in a cleft of rocks, approximately 250–300 miles north of the town. The full party converged on the site and mined systematically for roughly 18 months. Both gold and silver were recovered in significant quantities.

Beale made two trips back to Virginia to deposit the treasure:

- **First deposit (November 1819):** 1,014 lbs of gold and 3,812 lbs of silver
- **Second deposit (December 1821):** 1,907 lbs of gold, 1,288 lbs of silver, and jewels valued at $13,000 (obtained in St. Louis in exchange for silver)

The treasure was stored in iron pots with iron covers, placed in a stone-lined vault six feet below the surface, roughly four miles from Buford's Tavern in Bedford County.

---

## Part II: The Three Ciphers

### Cipher 2 — The Contents (SOLVED)

**Key document:** The Declaration of Independence (1,322 words)
**Method:** Book cipher — each number maps to a word in the key text; the first letter of that word becomes the plaintext letter.

#### The Decoded Message

> I HAVE DEPOSITED IN THE COUNTY OF BEDFORD ABOUT FOUR MILES FROM BUFORD'S IN AN EXCAVATION OR VAULT SIX FEET BELOW THE SURFACE OF THE GROUND THE FOLLOWING ARTICLES BELONGING JOINTLY TO THE PARTIES WHOSE NAMES ARE GIVEN IN NUMBER THREE HEREWITH THE FIRST DEPOSIT CONSISTED OF TEN HUNDRED AND FOURTEEN POUNDS OF GOLD AND THIRTY EIGHT HUNDRED AND TWELVE POUNDS OF SILVER DEPOSITED NOVEMBER EIGHTEEN NINETEEN THE SECOND WAS MADE DECEMBER EIGHTEEN TWENTY ONE AND CONSISTED OF NINETEEN HUNDRED AND SEVEN POUNDS OF GOLD AND TWELVE HUNDRED AND EIGHTY EIGHT OF SILVER ALSO JEWELS OBTAINED IN ST LOUIS IN EXCHANGE TO SAVE TRANSPORTATION AND VALUED AT THIRTEEN THOUSAND DOLLARS THE ABOVE IS SECURELY PACKED IN IRON POTS WITH IRON COVERS THE VAULT IS ROUGHLY LINED WITH STONE AND THE VESSELS REST ON SOLID STONE AND ARE COVERED WITH OTHERS PAPER NUMBER ONE DESCRIBES THE EXACT LOCALITY OF THE VAULT SO THAT NO DIFFICULTY WILL BE HAD IN FINDING IT

#### Known Encoding Limitations

The Declaration of Independence lacks words beginning with certain letters, forcing substitutions:

| Missing Letter | Substitution | Example |
|---|---|---|
| Y | F (from "fundamentally") | COUNTF → COUNTY, THIRTF → THIRTY |
| X | S (from "sexes") | ESCAVATION → EXCAVATION, SIS → SIX |

#### Statistical Profile

| Metric | Value |
|---|---|
| Total numbers | 763 |
| Unique numbers | 180 (24%) |
| Max number | 1,005 |
| Max reuse of a single number | 18 |
| Ascending runs (5+) | 11 |
| Ascending runs (7+) | 0 |
| Repeated 2-grams | 47 |
| Repeated 3-grams | 3 |
| Consecutive pairs (n, n+1) | 13 |

These statistics are consistent with a genuine book cipher. High number reuse and repeated sequences reflect natural word patterns in the key document.

---

### Cipher 1 — The Location (UNSOLVED)

#### Statistical Profile

| Metric | Value |
|---|---|
| Total numbers | 520 |
| Unique numbers | 298 (57%) |
| Max number | 2,906 |
| Max reuse of a single number | 8 |
| Ascending runs (5+) | 16 |
| Ascending runs (7+) | 1 |
| Repeated 2-grams | 1 |
| Repeated 3-grams | 0 |
| Consecutive pairs (n, n+1) | 0 |

#### Key Observations

The highest number in Cipher 1 (2,906) far exceeds the word count of the Declaration of Independence (1,322), meaning the DOI cannot be the correct key — unless a fundamentally different numbering scheme is used (e.g., numbering every other word, or counting characters rather than words).

NSA analysis (runs analysis, modulo analysis) suggests the author "jumped back" frequently during encoding, and that mostly even numbers appear — which may indicate that the author numbered only every other word of the key text.

#### The Hidden Alphabet — A Smoking Gun

When Cipher 1 is decoded using the DOI, positions 188–207 produce a near-alphabetical sequence:

```
A B F D E F G H I I J K L M M N O H P P
```

This is a clearly *attempted* alphabet with human encoding errors:

| Position | Expected | Decoded | Error |
|---|---|---|---|
| 1 | A | A | ✓ |
| 2 | B | B | ✓ |
| 3 | C | F | Skipped C |
| 4–9 | D–I | D–I | ✓ |
| 10 | J | I | Repeated I |
| 11–14 | K–N | J–M | Shifted by 1 |
| 15 | O | M | Repeated M |
| 16–17 | P–Q | N–O | Shifted by 2 |
| 18 | R | H | Jumped back 10 |
| 19–20 | S–T | P–P | Two P's |

**Significance:** This sequence proves the encoder *knew* the DOI was the key for Cipher 2 and deliberately embedded a signature. But the full cipher still produces gibberish with the DOI, with wrong letter frequencies (T=18%, E=3.5% — far from normal English). This points strongly toward either a hoax or layered encryption.

#### Potential Key Document Requirements

- Must contain at least 2,906+ words (or use a non-standard numbering scheme)
- May relate to Spanish/Mexican themes (given the Santa Fe expedition context)
- NSA analysis notes that "alternating word numbering" may be involved
- A 1970 cryptographic team claimed the code contains "references and terms related to ancient Spanish lore" and "incorporates part of Code No. 3" — suggesting Ciphers 1 and 3 may be linked

---

### Cipher 3 — The Names (UNSOLVED)

#### Statistical Profile

| Metric | Value |
|---|---|
| Total numbers | 618 |
| Unique numbers | 263 (43%) |
| Max number | 975 |
| Max reuse of a single number | 13 |
| Ascending runs (5+) | 73 |
| Ascending runs (7+) | 24 |
| Repeated 2-grams | 2 |
| Repeated 3-grams | 0 |
| Consecutive pairs (n, n+1) | 1 |

#### Critical Problem: Insufficient Length

Cipher 3 supposedly contains names and addresses for approximately 30 party members *plus* their relatives/next of kin — roughly 60 names and addresses. Yet it contains only 618 numbers. Possible explanations:

1. Uses an abbreviated format
2. Uses a different encoding method (not first-letter of words)
3. Some numbers encode multiple letters
4. The description of contents is inaccurate

#### Evidence of Fabrication

**Excessive ascending runs:** Cipher 3 has 73 ascending runs of 5+ numbers — *seven times* more than the genuine Cipher 2 (11). Real book ciphers produce chaotic sequences; C3 is suspiciously ordered.

**Suspicious ending pattern:** The last 17 numbers are nearly monotonically increasing:

```
39 → 86 → 103 → 116 → 138 → 164 → 212 → 218 → 296 → 815 → 380 → 412 → 460 → 495 → 675 → 820 → 952
```

Compare this to C2's chaotic ending: `241, 540, 122, 8, 10, 63, 140, 47, 48, 140, 288`. The ascending pattern looks like someone "winding down" by picking increasing numbers — not genuine encoding.

**Zero repeated 3-grams:** Real book ciphers produce repeated sequences from common word patterns. Cipher 2 has 47 repeated 2-grams and 3 repeated 3-grams. Cipher 3 has only 2 repeated 2-grams and zero 3-grams — "too random" for real encoding.

**Missing number ranges:** C3 has zero numbers in ranges 501–550, 551–600, and 751–800. A real ~1,000-word key document would have usable words throughout. These gaps suggest fabricated numbers.

#### Theoretical Solution (Unverified)

An unverified claim proposes 16 names decoded from Cipher 3:

| # | Name | Notes |
|---|---|---|
| 1 | Samuel Morris | Similar to innkeeper Robert Morriss |
| 2 | Buford Thomas Carter | Buford connection (tavern) |
| 3 | James Walker | — |
| 4 | John Andrew | — |
| 5 | Charles Edward | — |
| 6 | Michael William | — |
| 7 | Francis Stuart | — |
| 8 | Joseph Monroe | Presidential name |
| 9 | Henry Jefferson | Presidential name |
| 10 | Christopher Phillip Carter | Carter family (2nd mention) |
| 11 | Randolph Madison | Presidential name |
| 12 | Jackson Tyler | Presidential names |
| 13 | Peter Smith | — |
| 14 | Franklin Johnson | Presidential names |
| 15 | Isaac Johnson | Johnson (2nd mention) |
| 16 | Nathaniel Adams | Presidential name |

**Residences mentioned:** Winchester, Bedford, and Lynchburg (all Virginia).

**Problems:**

- Only 16 names (the story claims 30+ party members)
- No relatives listed (the story says relatives were included)
- Many names echo U.S. Presidents — suspicious, or simply reflective of 1820s naming conventions
- No key document or method disclosed
- Requires independent verification against historical records

#### Census Cross-Reference

When the 16 theoretical names are checked against the 677 surnames in the 1820 Bedford County Census:

- **Exact matches (11):** Morris, Carter, Walker, Jefferson, Smith, Johnson, Adams, Tyler, Jackson, Franklin, Randolph
- **Close matches (3):** Andrew → Andrews, Edward → Edwards, William → Williams
- **Not found (2):** Stuart (but Stewart exists), Monroe, Madison

13 of 16 names (81%) have matches — notable, but possibly coincidental given that these are overwhelmingly common Virginia surnames.

Key Beale-related surnames confirmed in the 1820 Census: **Buford** (the tavern owner family) and **Morriss** (the innkeeper). Notably, **Beale is NOT in the 1820 Bedford County Census**, suggesting Thomas Beale was from elsewhere or used an alias.

---

## Part III: Cipher Method Analysis

### Historical Methods Available in 1820s Virginia

| Method | Era | How It Works | Applicable? |
|---|---|---|---|
| Book Cipher (word first letter) | 1500s+ | Number = word position, take first letter | ✓ Used by Cipher 2 |
| Arnold Cipher | 1780 | Page.Line.Word format (3 numbers) | ✗ Beale uses single numbers |
| Dictionary Code | 1809 | Page.Column.Entry | ✗ Would show alphabetic patterns |
| Nomenclator | 1700s | Codebook with numbered entries | ? Possible but needs codebook |
| Letter Position | Ancient | Number = position of letter in text | ✓ Worth testing |
| Skip Cipher (every Nth) | Ancient | Count every Nth word/letter | ✓ Worth testing |
| Vigenère | 1585 | Polyalphabetic substitution | ✗ Produces letters, not numbers |

### Letter-Based Methods Score Higher for Cipher 3

Testing the DOI against Cipher 3 using different methods:

| Method | Bigram Hits | Trigram Hits | Frequency Deviation |
|---|---|---|---|
| **Letter Position** | 9 | 2 | 9.7 |
| **Every 5th Letter** | 9 | 4 | 10.8 |
| Word First Letter | 5 | 2 | 28.2 |

This suggests that if Cipher 3 is genuine, it may *not* use the standard word-first-letter method used by Cipher 2.

### Most Promising Hypothesis for Cipher 3

**Cipher 3 uses LETTER POSITION method with a ~1,000-word (~5,000-character) document.**

Evidence:

1. Letter-position on the DOI scores highest for English-like patterns
2. Max number 975 fits the character count of a similar-length document
3. Would explain why word-first-letter produces gibberish
4. Explains lack of repeated patterns (letter positions are more spread out)

### The "Ironclad Document" Theory

Beale used the Declaration of Independence for Cipher 2 — a permanent, official, widely available document that would never change. The same logic should apply to Ciphers 1 and 3. Key documents must be:

- **Permanent and unchangeable**
- **Widely available in 1820s Virginia**
- **Official/legal documents that would survive indefinitely**

#### Word Count Requirements

| Cipher | Max Number | Required Key Length |
|---|---|---|
| Cipher 1 | 2,906 | ~3,000+ words |
| Cipher 2 | 1,005 | ~1,000+ words (DOI = 1,322) ✓ |
| Cipher 3 | 975 | ~1,000+ words |

#### Documents Tested

| Document | Words | Cipher Fit | Result |
|---|---|---|---|
| Declaration of Independence | 1,322 | C2 | **WORKS** |
| Virginia Declaration of Rights | 902 | C3? | Gibberish (too short) |
| US Constitution (1787) | 4,431 | C1? | Gibberish (E=6.2%, should be 12.7%) |
| Bill of Rights (1791) | ~450 | — | Too short |
| Articles of Confederation | ~3,000 | C1? | Tested, inconclusive |
| Monroe Doctrine (1823) | — | — | Tested, inconclusive |
| Federalist No. 1 (Hamilton) | — | — | Tested, inconclusive |

#### Best Remaining Candidates

**For Cipher 1 (max 2,906):**
- Virginia Constitution (1776) — untested with alternative numbering
- Articles of Confederation — with different numbering scheme
- US Constitution with every-other-word numbering

**For Cipher 3 (max 975):**
- Virginia Constitution (1776)
- A specific legal charter or compact
- Possibly the same document as C1 with a different numbering scheme

---

## Part IV: The Hoax Question

### Evidence FOR Hoax

#### Stylistic Analysis (Friedman & Kullback, NSA)

William F. Friedman and Solomon Kullback, legendary NSA cryptanalysts, conducted a statistical stylistic comparison and concluded:

> "The writers of the two texts [Ward and Beale] were the same person and thus the whole affair was a hoax."

#### Anachronistic Language (Nickell's Analysis)

Two words in Beale's letter (dated 1822) appear to be anachronisms:

- **"Stampeding"** — earliest known *printed* source is 1883
- **"Improvised"** — earliest known source is 1837

This suggests the text was written in the mid-1880s, not the 1820s.

**Counter-argument:** "Stampede" derives from Mexican Spanish *estampida* and was likely used orally in the American Southwest well before it appeared in Eastern print. If Beale was genuinely in Santa Fe 1817–1821 chasing buffalo with Spanish-speaking guides, he may have naturally used "stampeding" before it was formally published. Frontier vocabulary often existed in speech decades before formal publication.

#### The Hidden Alphabet in Cipher 1

The alphabet sequence at positions 188–207 proves the encoder *knew* the DOI key but did not use it honestly. This is either:

- A deliberate "I know C2's key" signature in an otherwise meaningless cipher
- An accidental test sequence left in the final cipher
- Evidence of layered encryption (unlikely for 1820s)

#### Statistical Anomalies in Cipher 3

- 7× more ascending runs than the genuine Cipher 2
- Zero repeated 3-grams (statistically improbable for real encoding)
- "Lazy ascending" ending pattern typical of human fabrication
- Missing number ranges (gaps at 501–600, 751–800)

#### Narrative Red Flags

- Why encrypt the *contents* (C2) but not send the key as promised?
- Cipher 2's closing line ("paper number one describes the exact locality") seems designed to fuel interest in Cipher 1
- Ward published the pamphlet in 1885 when he was "no longer prosperous"
- The ten-year delay before Morriss could open the box conveniently prevents verification

### Evidence AGAINST Hoax

#### NSA Statistical Analysis: All Three Are Genuine Encodings

Detailed runs analysis confirms that none of the three ciphers were constructed randomly (via dice, coins, or random tables). All show encoding artifacts consistent with book cipher methodology:

- Runs-down of length one dominate (consistent with "jumping back" during encoding)
- Logarithmic sort analysis matches real ciphers, not random data

#### Author Signature

Autoregression cycle analysis reveals a cycle of **17** appearing across all three ciphers — consistent with a single author.

#### Cipher 2 Works

If the entire affair were a hoax, why create one genuine, working cipher? The effort required to produce a coherent book cipher that decodes to meaningful English is substantial and argues for at least partial authenticity.

#### Historical Anchors

- Robert Morriss and the Buford family were real, documented residents of Bedford County
- The 1820 Census confirms 81% of the theoretical Cipher 3 names
- The Santa Fe Trail and gold/silver mining in the Southwest were real activities in the 1817–1821 timeframe

#### The 1970 Partial Solution Claim

A cryptographic team reported in 1970 that they had:

- Located "13 out of 15 landmarks" described in Cipher 1
- Found "references and terms related to ancient Spanish lore"
- Determined that Cipher 1 "incorporates part of Code No. 3"
- Left "one small portion" still undeciphered

This claim, while unverified, suggests that at least some researchers found meaningful content in the unsolved ciphers.

---

## Part V: Comprehensive Statistical Comparison

| Metric | C2 (Genuine) | C1 (Unsolved) | C3 (Unsolved) |
|---|---|---|---|
| Total numbers | 763 | 520 | 618 |
| Unique numbers | 180 (24%) | 298 (57%) | 263 (43%) |
| Max number | 1,005 | 2,906 | 975 |
| Max reuse of single number | 18 | 8 | 13 |
| Ascending runs (5+) | 11 | 16 | **73** |
| Ascending runs (7+) | 0 | 1 | **24** |
| Repeated 2-grams | 47 | 1 | 2 |
| Repeated 3-grams | 3 | 0 | 0 |
| Consecutive pairs (n, n+1) | 13 | 0 | 1 |
| Decodes with DOI? | ✓ Yes | ✗ Gibberish | ✗ Gibberish |

**Key takeaways:**

- **Cipher 2** behaves exactly as expected for a genuine book cipher: high word reuse, many repeated sequences from common English patterns.
- **Cipher 1** has low reuse and a hidden alphabet proving DOI knowledge, but does not decode — suggesting either a hoax with an embedded signature or a genuine cipher with a different/unknown key.
- **Cipher 3** has excessive ordering, zero 3-grams, and a suspicious ending — the statistical profile most consistent with fabricated numbers.

---

## Part VI: Verdict and Open Questions

### Assessment of Authenticity

| Cipher | Verdict | Confidence |
|---|---|---|
| Cipher 2 | **GENUINE** | High — decodes to coherent English with verifiable key |
| Cipher 1 | **LIKELY HOAX** | Moderate — hidden alphabet proves DOI knowledge but cipher doesn't decode |
| Cipher 3 | **LIKELY HOAX** | High — multiple statistical anomalies inconsistent with genuine encoding |

### If Still Pursuing Decryption

Despite the hoax evidence, several avenues remain:

1. **Cipher 1 may use layered encryption:** The DOI as a first layer plus an additional transformation
2. **The alphabet sequence might be a key:** Positions 188–207 could encode transformation parameters
3. **Test alternative numbering schemes:** Every 2nd word, letter-counting instead of word-counting
4. **Cipher 3's number gaps (501–600):** Could indicate specific document structure if genuine
5. **Letter-position encoding:** The most promising untested method for Cipher 3

### Historical Questions Worth Pursuing

Even if the ciphers are hoaxes, fascinating questions remain:

1. **Who was Ward's source?** Did he have access to a real story that inspired the hoax?
2. **Why does Cipher 2 work?** If everything is fake, creating one genuine cipher is an extraordinary amount of effort
3. **The Morriss/Buford connection:** These were real people with documented presence in Bedford County
4. **Identity of Thomas Jefferson Beale:** Genealogical research traces a Beale family in Virginia to York County (1649), with a Thomas J. Beale noted as having "went to Missouri" — but no definitive link to the cipher author has been established
5. **The 1970 partial solution:** If verified, it would overturn the hoax theory entirely

---

## Appendix A: The Cipher Texts

### Cipher 1 — The Locality of the Vault

```
71, 194, 38, 1701, 89, 76, 11, 83, 1629, 48, 94, 63, 132, 16, 111, 95, 84, 341,
975, 14, 40, 64, 27, 81, 139, 213, 63, 90, 1120, 8, 15, 3, 126, 2018, 40, 74,
758, 485, 604, 230, 436, 664, 582, 150, 251, 284, 308, 231, 124, 211, 486, 225,
401, 370, 11, 101, 305, 139, 189, 17, 33, 88, 208, 193, 145, 1, 94, 73, 416, 918,
263, 28, 500, 538, 356, 117, 136, 219, 27, 176, 130, 10, 460, 25, 485, 18, 436,
65, 84, 200, 283, 118, 320, 138, 36, 416, 280, 15, 71, 224, 961, 44, 16, 401, 39,
88, 61, 304, 12, 21, 24, 283, 134, 92, 63, 246, 486, 682, 7, 219, 184, 360, 780,
18, 64, 463, 474, 131, 160, 79, 73, 440, 95, 18, 64, 581, 34, 69, 128, 367, 460,
17, 81, 12, 103, 820, 62, 116, 97, 103, 862, 70, 60, 1317, 471, 540, 208, 121,
890, 346, 36, 150, 59, 568, 614, 13, 120, 63, 219, 812, 2160, 1780, 99, 35, 18,
21, 136, 872, 15, 28, 170, 88, 4, 30, 44, 112, 18, 147, 436, 195, 320, 37, 122,
113, 6, 140, 8, 120, 305, 42, 58, 461, 44, 106, 301, 13, 408, 680, 93, 86, 116,
530, 82, 568, 9, 102, 38, 416, 89, 71, 216, 728, 965, 818, 2, 38, 121, 195, 14,
326, 148, 234, 18, 55, 131, 234, 361, 824, 5, 81, 623, 48, 961, 19, 26, 33, 10,
1101, 365, 92, 88, 181, 275, 346, 201, 206, 86, 36, 219, 324, 829, 840, 64, 326,
19, 48, 122, 85, 216, 284, 919, 861, 326, 985, 233, 64, 68, 232, 431, 960, 50,
29, 81, 216, 321, 603, 14, 612, 81, 360, 36, 51, 62, 194, 78, 60, 200, 314, 676,
112, 4, 28, 18, 61, 136, 247, 819, 921, 1060, 464, 895, 10, 6, 66, 119, 38, 41,
49, 602, 423, 962, 302, 294, 875, 78, 14, 23, 111, 109, 62, 31, 501, 823, 216,
280, 34, 24, 150, 1000, 162, 286, 19, 21, 17, 340, 19, 242, 31, 86, 234, 140,
607, 115, 33, 191, 67, 104, 86, 52, 88, 16, 80, 121, 67, 95, 122, 216, 548, 96,
11, 201, 77, 364, 218, 65, 667, 890, 236, 154, 211, 10, 98, 34, 119, 56, 216,
119, 71, 218, 1164, 1496, 1817, 51, 39, 210, 36, 3, 19, 540, 232, 22, 141, 617,
84, 290, 80, 46, 207, 411, 150, 29, 38, 46, 172, 85, 194, 39, 261, 543, 897, 624,
18, 212, 416, 127, 931, 19, 4, 63, 96, 12, 101, 418, 16, 140, 230, 460, 538, 19,
27, 88, 612, 1431, 90, 716, 275, 74, 83, 11, 426, 89, 72, 84, 1300, 1706, 814,
221, 132, 40, 102, 34, 868, 975, 1101, 84, 16, 79, 23, 16, 81, 122, 324, 403,
912, 227, 936, 447, 55, 86, 34, 43, 212, 107, 96, 314, 264, 1065, 323, 428, 601,
203, 124, 95, 216, 814, 2906, 654, 820, 2, 301, 112, 176, 213, 71, 87, 96, 202,
35, 10, 2, 41, 17, 84, 221, 736, 820, 214, 11, 60, 760
```

### Cipher 2 — The Contents of the Vault

```
115, 73, 24, 807, 37, 52, 49, 17, 31, 62, 647, 22, 7, 15, 140, 47, 29, 107, 79,
84, 56, 239, 10, 26, 811, 5, 196, 308, 85, 52, 160, 136, 59, 211, 36, 9, 46, 316,
554, 122, 106, 95, 53, 58, 2, 42, 7, 35, 122, 53, 31, 82, 77, 250, 196, 56, 96,
118, 71, 140, 287, 28, 353, 37, 1005, 65, 147, 807, 24, 3, 8, 12, 47, 43, 59, 807,
45, 316, 101, 41, 78, 154, 1005, 122, 138, 191, 16, 77, 49, 102, 57, 72, 34, 73,
85, 35, 371, 59, 196, 81, 92, 191, 106, 273, 60, 394, 620, 270, 220, 106, 388,
287, 63, 3, 6, 191, 122, 43, 234, 400, 106, 290, 314, 47, 48, 81, 96, 26, 115,
92, 158, 191, 110, 77, 85, 197, 46, 10, 113, 140, 353, 48, 120, 106, 2, 607, 61,
420, 811, 29, 125, 14, 20, 37, 105, 28, 248, 16, 159, 7, 35, 19, 301, 125, 110,
486, 287, 98, 117, 511, 62, 51, 220, 37, 113, 140, 807, 138, 540, 8, 44, 287, 388,
117, 18, 79, 344, 34, 20, 59, 511, 548, 107, 603, 220, 7, 66, 154, 41, 20, 50, 6,
575, 122, 154, 248, 110, 61, 52, 33, 30, 5, 38, 8, 14, 84, 57, 540, 217, 115, 71,
29, 84, 63, 43, 131, 29, 138, 47, 73, 239, 540, 52, 53, 79, 118, 51, 44, 63, 196,
12, 239, 112, 3, 49, 79, 353, 105, 56, 371, 557, 211, 505, 125, 360, 133, 143,
101, 15, 284, 540, 252, 14, 205, 140, 344, 26, 811, 138, 115, 48, 73, 34, 205,
316, 607, 63, 220, 7, 52, 150, 44, 52, 16, 40, 37, 158, 807, 37, 121, 12, 95, 10,
15, 35, 12, 131, 62, 115, 102, 807, 49, 53, 135, 138, 30, 31, 62, 67, 41, 85, 63,
10, 106, 807, 138, 8, 113, 20, 32, 33, 37, 353, 287, 140, 47, 85, 50, 37, 49, 47,
64, 6, 7, 71, 33, 4, 43, 47, 63, 1, 27, 600, 208, 230, 15, 191, 246, 85, 94, 511,
2, 270, 20, 39, 7, 33, 44, 22, 40, 7, 10, 3, 811, 106, 44, 486, 230, 353, 211,
200, 31, 10, 38, 140, 297, 61, 603, 320, 302, 666, 287, 2, 44, 33, 32, 511, 548,
10, 6, 250, 557, 246, 53, 37, 52, 83, 47, 320, 38, 33, 807, 7, 44, 30, 31, 250,
10, 15, 35, 106, 160, 113, 31, 102, 406, 230, 540, 320, 29, 66, 33, 101, 807, 138,
301, 316, 353, 320, 220, 37, 52, 28, 540, 320, 33, 8, 48, 107, 50, 811, 7, 2, 113,
73, 16, 125, 11, 110, 67, 102, 807, 33, 59, 81, 158, 38, 43, 581, 138, 19, 85,
400, 38, 43, 77, 14, 27, 8, 47, 138, 63, 140, 44, 35, 22, 177, 106, 250, 314,
217, 2, 10, 7, 1005, 4, 20, 25, 44, 48, 7, 26, 46, 110, 230, 807, 191, 34, 112,
147, 44, 110, 121, 125, 96, 41, 51, 50, 140, 56, 47, 152, 540, 63, 807, 28, 42,
250, 138, 582, 98, 643, 32, 107, 140, 112, 26, 85, 138, 540, 53, 20, 125, 371, 38,
36, 10, 52, 118, 136, 102, 420, 150, 112, 71, 14, 20, 7, 24, 18, 12, 807, 37, 67,
110, 62, 33, 21, 95, 220, 511, 102, 811, 30, 83, 84, 305, 620, 15, 2, 10, 8, 220,
106, 353, 105, 106, 60, 275, 72, 8, 50, 205, 185, 112, 125, 540, 65, 106, 807,
138, 96, 110, 16, 73, 33, 807, 150, 409, 400, 50, 154, 285, 96, 106, 316, 270,
205, 101, 811, 400, 8, 44, 37, 52, 40, 241, 34, 205, 38, 16, 46, 47, 85, 24, 44,
15, 64, 73, 138, 807, 85, 78, 110, 33, 420, 505, 53, 37, 38, 22, 31, 10, 110, 106,
101, 140, 15, 38, 3, 5, 44, 7, 98, 287, 135, 150, 96, 33, 84, 125, 807, 191, 96,
511, 118, 40, 370, 643, 466, 106, 41, 107, 603, 220, 275, 30, 150, 105, 49, 53,
287, 250, 208, 134, 7, 53, 12, 47, 85, 63, 138, 110, 21, 112, 140, 485, 486, 505,
14, 73, 84, 575, 1005, 150, 200, 16, 42, 5, 4, 25, 42, 8, 16, 811, 125, 160, 32,
205, 603, 807, 81, 96, 405, 41, 600, 136, 14, 20, 28, 26, 353, 302, 246, 8, 131,
160, 140, 84, 440, 42, 16, 811, 40, 67, 101, 102, 194, 138, 205, 51, 63, 241, 540,
122, 8, 10, 63, 140, 47, 48, 140, 288
```

### Cipher 3 — Names and Residences

```
317, 8, 92, 73, 112, 89, 67, 318, 28, 96, 107, 41, 631, 78, 146, 397, 118, 98,
114, 246, 348, 116, 74, 88, 12, 65, 32, 14, 81, 19, 76, 121, 216, 85, 33, 66, 15,
108, 68, 77, 43, 24, 122, 96, 117, 36, 211, 301, 15, 44, 11, 46, 89, 18, 136, 68,
317, 28, 90, 82, 304, 71, 43, 221, 198, 176, 310, 319, 81, 99, 264, 380, 56, 37,
319, 2, 44, 53, 28, 44, 75, 98, 102, 37, 85, 107, 117, 64, 88, 136, 48, 151, 99,
175, 89, 315, 326, 78, 96, 214, 218, 311, 43, 89, 51, 90, 75, 128, 96, 33, 28,
103, 84, 65, 26, 41, 246, 84, 270, 98, 116, 32, 59, 74, 66, 69, 240, 15, 8, 121,
20, 77, 89, 31, 11, 106, 81, 191, 224, 328, 18, 75, 52, 82, 117, 201, 39, 23, 217,
27, 21, 84, 35, 54, 109, 128, 49, 77, 88, 1, 81, 217, 64, 55, 83, 116, 251, 269,
311, 96, 54, 32, 120, 18, 132, 102, 219, 211, 84, 150, 219, 275, 312, 64, 10, 106,
87, 75, 47, 21, 29, 37, 81, 44, 18, 126, 115, 132, 160, 181, 203, 76, 81, 299,
314, 337, 351, 96, 11, 28, 97, 318, 238, 106, 24, 93, 3, 19, 17, 26, 60, 73, 88,
14, 126, 138, 234, 286, 297, 321, 365, 264, 19, 22, 84, 56, 107, 98, 123, 111,
214, 136, 7, 33, 45, 40, 13, 28, 46, 42, 107, 196, 227, 344, 198, 203, 247, 116,
19, 8, 212, 230, 31, 6, 328, 65, 48, 52, 59, 41, 122, 33, 117, 11, 18, 25, 71, 36,
45, 83, 76, 89, 92, 31, 65, 70, 83, 96, 27, 33, 44, 50, 61, 24, 112, 136, 149,
176, 180, 194, 143, 171, 205, 296, 87, 12, 44, 51, 89, 98, 34, 41, 208, 173, 66,
9, 35, 16, 95, 8, 113, 175, 90, 56, 203, 19, 177, 183, 206, 157, 200, 218, 260,
291, 305, 618, 951, 320, 18, 124, 78, 65, 19, 32, 124, 48, 53, 57, 84, 96, 207,
244, 66, 82, 119, 71, 11, 86, 77, 213, 54, 82, 316, 245, 303, 86, 97, 106, 212,
18, 37, 15, 81, 89, 16, 7, 81, 39, 96, 14, 43, 216, 118, 29, 55, 109, 136, 172,
213, 64, 8, 227, 304, 611, 221, 364, 819, 375, 128, 296, 1, 18, 53, 76, 10, 15,
23, 19, 71, 84, 120, 134, 66, 73, 89, 96, 230, 48, 77, 26, 101, 127, 936, 218,
439, 178, 171, 61, 226, 313, 215, 102, 18, 167, 262, 114, 218, 66, 59, 48, 27, 19,
13, 82, 48, 162, 119, 34, 127, 139, 34, 128, 129, 74, 63, 120, 11, 54, 61, 73, 92,
180, 66, 75, 101, 124, 265, 89, 96, 126, 274, 896, 917, 434, 461, 235, 890, 312,
413, 328, 381, 96, 105, 217, 66, 118, 22, 77, 64, 42, 12, 7, 55, 24, 83, 67, 97,
109, 121, 135, 181, 203, 219, 228, 256, 21, 34, 77, 319, 374, 382, 675, 684, 717,
864, 203, 4, 18, 92, 16, 63, 82, 22, 46, 55, 69, 74, 112, 134, 186, 175, 119, 213,
416, 312, 343, 264, 119, 186, 218, 343, 417, 845, 951, 124, 209, 49, 617, 856,
924, 936, 72, 19, 28, 11, 35, 42, 40, 66, 85, 94, 112, 65, 82, 115, 119, 236, 244,
186, 172, 112, 85, 6, 56, 38, 44, 85, 72, 32, 47, 63, 96, 124, 217, 314, 319, 221,
644, 817, 821, 934, 922, 416, 975, 10, 22, 18, 46, 137, 181, 101, 39, 86, 103,
116, 138, 164, 212, 218, 296, 815, 380, 412, 460, 495, 675, 820, 952
```

---

## Appendix B: Research Sources

### Primary Sources

- **"The Beale Papers"** by George L. Hart, Sr. — Roanoke (VA) Public Library, 1964 (presenting the original Ward pamphlet content)
- **"Genealogy of the Beale Family"** by Frances Beal Hodges — Published Ann Arbor, Michigan, 1956
- **NSA DOCID: 656743** — "Has the Beale Treasure Been Found?" by Al Masters, *True Treasure*, 1970
- **"Historical and Analytical Studies in Relation to the Beale Cyphers"** — Carl W. Nelson, Jr., dated 7 March 1970 (Beale Cypher Study Committee internal document)
- **"Signature Simulation and Certain Cryptographic Codes"** — Statistical analysis by Beale Cypher Association
- **1820 Census Index, Bedford County, Virginia** — S-K Publications

### Key Documents Tested as Potential Keys

- Declaration of Independence (**confirmed key for Cipher 2**)
- US Constitution (1787)
- Virginia Declaration of Rights
- Bill of Rights (1791)
- Articles of Confederation
- Monroe Doctrine (1823)
- Federalist No. 1 (Hamilton)
- The Constitution of the United States

---

*This document represents a synthesis of original source analysis, statistical research, historical verification, and cryptographic testing conducted as part of an ongoing investigation into the Beale Cipher mystery.*
