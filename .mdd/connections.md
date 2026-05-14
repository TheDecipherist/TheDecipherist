---
generated: 2026-05-14
doc_count: 3
connection_count: 3
overlap_count: 3
---

# MDD Connections

## Path Tree

```
Site/
├── Animations  03-page-animations  in_progress
├── Build Pipeline  02-build-html  complete
└── Foundation  01-create-github-pages  complete
```

## Dependency Graph

```mermaid
graph TD
  N01["01-create-github-pages"]:::complete
  N02["02-build-html"]:::complete
  N03["03-page-animations"]:::in_progress
  N02 --> N01
  N03 --> N01
  N03 --> N02
  classDef complete fill:#00e5cc,color:#000
  classDef in_progress fill:#ffaa00,color:#000
  classDef draft fill:#888,color:#fff
  classDef deprecated fill:#555,color:#aaa
```

## Source File Overlap

| Source File | Referenced By |
|-------------|--------------|
| docs/index.html | 01-create-github-pages, 02-build-html, 03-page-animations |
| docs/css/src/animations/scroll-driven.css | 01-create-github-pages, 03-page-animations |
| docs/css/src/components/stat-counter.css | 01-create-github-pages, 03-page-animations |

## Warnings

(none)
