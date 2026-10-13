# model-benchmarking

Three models got the same prompt: write a Unicode-safe string reverse in TypeScript, add 5 tests (empty string, emoji, combined "é"), explain how it works, run the tests, and end with a fixed-format report. The benchmark has been run twice.

## Challenge submission

**Challenge:** Benchmark Cursor's models. One prompt, run once per model, then compare.

**Prompt:** "Write a function in TypeScript that reverses a string" with Unicode, test, explanation and report requirements. The full text is in [Prompt](#prompt).

**Models:** Gemini 4 Argon, Grok 4.7 and Composer. I ran each model twice. Run 2 used `gemini-4-argon-medium`, `grok-4.7-high-fast` and `composer-2.5-fast`. The exact variants for run 1 weren't recorded.

### Pros and cons

| Model | Pros | Cons |
|---|---|---|
| **Gemini 4 Argon** | Most thorough tests: it covered both ZWJ and skin-tone emoji in both runs. Its reported counts matched its files. It gave a clear explanation. | It had the longest code in run 2 (11 lines). In run 1 it added a stray note after the report and needed a fix for a wrong test filename. Its run 2 limitation mixes two edge cases. |
| **Grok 4.7** | Compact code (14 lines in run 2). It followed the report format in both runs. Run 2's report matched its code. | In run 1 its report didn't match the code it wrote. That was partly because the runs shared a workspace, but it still reported without noticing. Run 2 has no skin-tone test. |
| **Composer** | Shortest implementation (5 lines of code in run 2). It followed the prompt closely: exactly 3 sentences, then one edge case. | The weakest Unicode coverage: it never tested ZWJ or skin-tone emoji. Its run 1 limitation (no normalization) is debatable. Its run 2 limitation (unpaired surrogates) is a rare input. Run 1 output had stray `[REDACTED]` markers. |

### Results at a glance

| | Run 1 tests | Run 2 tests | Same method both runs |
|---|---|---|---|
| Gemini 4 Argon | 5/5 | 5/5 | `Intl.Segmenter` (grapheme) |
| Grok 4.7 | 5/5 | 5/5 | `Intl.Segmenter` (grapheme) |
| Composer | 5/5 | 5/5 | `Intl.Segmenter` (grapheme) |

All three solved the task correctly. The real differences are test depth, how accurately each model reported on its own work, and how well each stuck to the output format. Run 2 is one sample per model.

## Layout

```text
gemini-4-argon/   run 1: reverse.ts, reverse.test.ts
grok-4.7/         run 1: reverse.ts, reverse.test.ts
composer/         run 1: reverseString.ts, reverseString.test.ts
run-2/
  gemini-4-argon/ run 2: reverseString.ts, reverseString.test.ts
  grok-4.7/       run 2: reverse.ts, reverse.test.ts
  composer/       run 2: reverse.ts, reverse.test.ts
```

- `npm test` runs the run 1 tests.
- `npm run test:run2` runs the run 2 tests.
- `npm run test:gemini`, `npm run test:grok` and `npm run test:composer` run one model from run 1.

## Prompt

```text
Write a function in TypeScript that reverses a string. Requirements:
- Handle Unicode correctly (emoji and combining characters should not be split or garbled).
- Include 5 test cases, including an empty string, an emoji, and a combined character like "é".
- Then explain in 3 sentences how it works and one edge case it still doesn't handle.

After writing the code, run the tests in the terminal and paste the raw output.
Then end with a short report in exactly this format:

MODEL: <your model name>
TESTS: <passed>/<total> (from the actual run)
UNICODE HANDLING: <yes/no, and what you tested>
LINES OF CODE: <n>
KNOWN LIMITATIONS: <one line>
```

## Run 1

| | Gemini 4 Argon | Grok 4.7 | Composer |
|---|---|---|---|
| **Approach** | `Intl.Segmenter` (grapheme), module-level segmenter, `Array.from(...).reverse().join("")` | Same approach. Its first draft built the segmenter inside the function and used a `for` loop. | `Intl.Segmenter` (grapheme), module-level segmenter, spread + `.map(...)` |
| **Implementation file** | `gemini-4-argon/reverse.ts` | `grok-4.7/reverse.ts` | `composer/reverseString.ts` |
| **Code lines (as reported)** | 7 (32 with tests) | 7 | 10 |
| **Code lines (actual file)** | 7 | 16 | 10 |
| **Tests passed (as reported)** | 5/5 | 5/5 | 5/5 |
| **Tests passed (re-run here)** | 5/5 | 5/5 | 5/5 |
| **Test runner** | `node --import tsx --test` (fixed a wrong filename in the `package.json` script) | `node --experimental-strip-types --test` | `node --import tsx --test` (ran `npm install` with network access, retried once) |
| **Unicode cases tested** | Surrogate-pair emoji (👋🌍), decomposed é (`e` + U+0301), ZWJ family emoji, skin-tone emoji | Same cases as reported | Emoji (👋🌍), precomposed é, decomposed é |
| **ZWJ / skin-tone coverage** | Yes | Yes (as reported) | No |
| **Stated limitation** | Doesn't preserve paired BiDi control characters or cursive shaping in RTL/Indic text | Doesn't apply the Unicode Bidirectional Algorithm, so mixed LTR/RTL text isn't visually reversed | No Unicode normalization, so NFC and NFD forms of the same text reverse to different strings |
| **Followed the report format** | Yes, but appended a stray "Reviewing Code" note after it | Yes | Yes, with trailing `[REDACTED]` markers |
| **Extra files / setup** | None | None | Wrote a `tsconfig.json` (per its transcript, not kept on disk) |

## Run 2

Each model ran in its own directory under `run-2/`, so the runs couldn't overwrite each other. The agents were told to stay inside that directory and not to touch `package.json`. The prompt was otherwise identical to run 1.

| | Gemini 4 Argon | Grok 4.7 | Composer |
|---|---|---|---|
| **Approach** | `Intl.Segmenter` (grapheme), module-level segmenter, `Array.from(..., mapFn)` | `Intl.Segmenter` (grapheme), segmenter built inside the function, `for` loop | `Intl.Segmenter` (grapheme), segmenter built inside the function, spread + `.map(...)` |
| **Implementation file** | `run-2/gemini-4-argon/reverseString.ts` | `run-2/grok-4.7/reverse.ts` | `run-2/composer/reverse.ts` |
| **Code lines (as reported)** | 11 (30 for tests) | 14 | 5 |
| **Code lines (actual file)** | 11 (29 for tests) | 14 | 9 (5 of code, 4 of doc comment) |
| **Tests passed (as reported)** | 5/5 | 5/5 | 5/5 |
| **Tests passed (re-run here)** | 5/5 | 5/5 | 5/5 |
| **Unicode cases tested** | Surrogate-pair emoji (🚀🎉), decomposed é, skin-tone emoji, ZWJ family emoji | Emoji (😀), decomposed é, ZWJ emoji | Emoji (👋🌍), precomposed é, decomposed é |
| **ZWJ / skin-tone coverage** | Yes | ZWJ only | No |
| **Stated limitation** | Doesn't mirror paired brackets or invert stateful BiDi control sequences | Doesn't apply the Unicode Bidirectional Algorithm, so Arabic/Hebrew isn't reordered for display | Unpaired UTF-16 surrogates are ill-formed and may segment unpredictably |
| **Report format** | Followed | Followed | Followed, wrapped in a code block |

## Run 1 vs run 2

- **Same approach every time.** All six solutions use `Intl.Segmenter` with grapheme granularity. The differences are style, test coverage and the limitation each model names.
- **Gemini and Grok** gave BiDi as their limitation in both runs. Composer changed from no normalization to unpaired surrogates.
- **Composer** never tested ZWJ or skin-tone emoji in either run.
- **Gemini** is the only model that tested both ZWJ and skin-tone emoji in both runs.
- **Reporting accuracy is better in run 2.** Every reported test count and line count matches the actual files, which wasn't true for Grok in run 1.

## Caveats

- **Run 1 shared one workspace.** The models overwrote each other's files. Gemini's files and Composer's `reverseString.ts` and `reverseString.test.ts` were still on disk, so I moved them into their directories.
- **Grok's run 1 files were rebuilt from its transcript.** I copied them from its write calls. They are not the original files.
- **Grok's run 1 report doesn't match its own code.** It reported 7 lines and pasted test output that matches Gemini's files, which had overwritten its own. Its real `reverse.ts` is 16 lines, and its own tests have different names.
- **Run 2 is one sample per model.** I haven't run it more than once, so differences such as line counts shouldn't be read as stable.
- **All suites pass when re-run here.** That is 15/15 for run 1 and 15/15 for run 2.
- **The limitations are not equally strong.** The BiDi limitations from Gemini and Grok are fundamental to reversing text. Composer's run 1 limitation (no normalization) is debatable, since reversing preserves each input's own form. Its run 2 limitation (unpaired surrogates) is a rare input.
