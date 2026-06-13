> how many times do I have to break this mtfker and rebuild it again

# nhqthang's (new again) blog

This is (once again) a space for myself where I document the thoughts of myself of all the pains, achievements, and any other things that interests me.

Once again, we are literally *"về bắt đầu"* one more time XDDD.

![hehe](./.github/readme/view.svg)

> [!NOTE]
> This site is still under construction!
>
> As this is built from the ground, some features might break, and other features might be missing as they are developed. I am trying to improve this site as much as possible.
>
> Thanks for your understanding!

## Tech Stack
- Frontend: [Svelte](https://svelte.dev/) v5, [SvelteKit](https://svelte.dev/tutorial/kit/introducing-sveltekit) v2.
- Backend: [Directus CMS](https://directus.io/), Markdown content, PostgreSQL as database.
- Parser: [`@humanspeak/svelte-markdown`](https://github.com/humanspeak/svelte-markdown).
- Runtime: [Bun](https://bun.sh/).
- Hosting: [Cloudflare Workers](https://developers.cloudflare.com/workers/).

## Running the Project
To run the project locally:
- You have to install [Bun](https://bun.sh/).
- And install Directus. There are a ton of ways to [install it](https://directus.io/docs/getting-started/create-a-project), but I use Docker for my setup.
- Once you're done, you have to import the [schema](./directus/schema.json) in the Directus directory. There isn't a way to import a schema directly, so you have to do it via the [Directus API](https://directus.io/docs/api/schema).
- Once you have the schema imported:
```bash
# Install dependencies
bun install

# Run the development server
bun run dev
```
I sometimes do develop components in Storybook. To run Storybook:
```bash
bun run storybook
```

## License
Except otherwise noted:
- The source code for this project is [licensed under MIT](./LICENSE-CODE).
- My blog content, photos, and assets are licensed under [Creative Commons Attribution-NonCommercial 4.0 International](https://creativecommons.org/licenses/by-nc/4.0/).
- Third party fonts, icons, depedencies are under their respective licenses.