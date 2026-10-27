# Project rules
- Static draft blogs are visible only in the development preview and excluded from production article lookup/listings and sitemap until approved, so publishing unrelated changes does not expose unreviewed content.
- The shared blog model supports optional author details, references, section figures and H3 blocks; existing articles omit them to preserve their layouts.
 - Blog articles may use an optional cardImage independent of the article banner so compact listing thumbnails do not change full article imagery.
- Keep static blog translations in a dedicated content dictionary consumed by LanguageContext.t(), preserving article structure, images and URLs across languages; this avoids runtime translation requests and keeps language selection consistent.
- ScrollToTop owns browser scroll restoration: clinic detail entries always reset to the top, while listing POP entries defer to MarketplaceSection's saved-card restoration to avoid competing browser scroll writes.
- MarketplaceSection uses participatingClinicsOnly to exclude dedicated directory entries from both restored caches and filtered results; the dedicated 24-hour page owns the static directory data.