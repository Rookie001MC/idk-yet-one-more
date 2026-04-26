import Root, { type AdmonitionVariant } from './admonition-root.svelte';
import Title from './admonition-title.svelte';
import Description from './admonition-description.svelte';

const Admonition = Root as typeof Root & {
	Title: typeof Title;
	Description: typeof Description;
};

Admonition.Title = Title;
Admonition.Description = Description;

export { Admonition, Title, Description, type AdmonitionVariant };
export default Admonition;
