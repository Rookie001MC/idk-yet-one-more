# TODO

- [x] Basic SEO
  - I hate this, for real, but if I don't do this, it won't show up well on Google/Facebook/Bluesky/...
  - [x] OpenGraph meta tags
  - [x] Satori image for posts that don't have FeaturedImages
  - [x] Auto excerpt when the excerpt is not filled in

- [x] Proper `+error.svelte` for any issues

- [x] Umami Analytics and Cloudflare Observability

- [x] Seperate the PageLayout and PostLayout into proper hirarchy

- [x] Fix Mobile layout bugs
  - [x] The entire mobile layout can be dragged sideways
    - Note that, while this is fixed, this can still be dragged back and forth ever slightly. If possible, this should be completely fixed in the future. 
  - [x] Increase the height of the Article page  

- [x] Blog Table of Contents
  - [x] Mobile: button, see https://svelte.dev's ToC button. Can be a full page overlay, with the TOC floating above it.
  - [x] PC: ToC stays on top with the position where the content starts, and moves with the content.

- [x] Expand the Image component to also allow Directus Asset UUID optimization

- [x] Refactor scoped `<style>` blocks across layouts and pages to use global SCSS styles where applicable, keeping only truly page/component-specific styles scoped.
  - Layouts: `BlogPostLayout.svelte`, `PageLayout.svelte`, `+layout.svelte`
  - Pages: `+page.svelte`, `about`, `blog`, `blog/[slug]`, `category/[slug]`, `contact`, `privacy-policy`, `tag/[slug]`
  - Components with shared-style candidates: `Header.svelte`, `Footer.svelte`, `PostCard.svelte`, `TableOfContents.svelte`

- [x] Write custom Embed key, or custom interface extension, to allow `<iframe>` embeds.

- [ ] Image component to make a placeholder when the image is loading. (or maybe building the entire skeleton)
  - Can use the Skeleton component from Shadcn-Svelte to save time.

- [ ] Search feature

- [ ] Switch components to use the Directus Visual Editor library

- [ ] Gallery Page with full data collection

- [ ] Comments (?, privacy issues if not dealt correctly)
