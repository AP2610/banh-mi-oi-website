# Issue tracker: Local Markdown

Issues and PRDs for this repository live as Markdown files under `.scratch/`.

## Conventions

- Use one directory per feature: `.scratch/<feature-slug>/`.
- Store the feature PRD at `.scratch/<feature-slug>/PRD.md`.
- Store implementation issues at `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01`.
- Record triage state as a `Status:` line near the top of each PRD or issue file, using the roles in `triage-labels.md`.
- Append comments or conversation history under a `## Comments` heading at the bottom of the relevant file.

## Publishing

When a skill says to publish to the issue tracker, create the appropriate Markdown file under `.scratch/<feature-slug>/`, creating its directories when needed.

## Fetching

When a skill says to fetch a ticket, read the referenced Markdown file. The user will normally provide the path or local issue number.
