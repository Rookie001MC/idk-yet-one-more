<script lang="ts">
	import { Admonition } from '$lib/components/ui/admonition';
	import Blockquote from '$lib/components/ui/Blockquote.svelte';
	import { Image } from '$lib/components/ui/image';
	// Static content replicated from https://itsrookienguyen.me/about/
</script>

<svelte:head>
	<title>About | Rookie's Blog</title>
</svelte:head>

<article class="about-page">
	<header class="about-header">
		<div class="header-image-container">
			<Image src="/images/about-cover.jpg" alt="Hero" class="hero-bg" />
			<div class="hero-overlay"></div>
		</div>
		<div class="container header-content">
			<h1 class="font-heading">A bit about myself.</h1>
			<p class="subtitle">
				Hello there. I actually love the sea. I'm trying some things. Read on for a bit more.
			</p>
		</div>
	</header>

	<div class="container about-content">
		<section class="section">
			<h2 class="font-heading">Myself.</h2>
			<p>My name is Rookie Nguyen. And the story I chose the name is actually a long one.</p>
			<p>
				Initially, it was literally because, when I was a kid, I just wanted to choose an in-game
				name for Halo. It obviously just a random choice, obviously, without any thinking in it,
				because, well, what do you even want from a 7-year-old kid?
			</p>
			<p>
				Fast forward a few years later, and I found a new meaning, a new life to once-dumb name.
			</p>
			<Blockquote>
				"Rookie", in the Cambridge English dictionary, is defined as a person who is new to an
				organization or an activity.
			</Blockquote>
			<p>
				It represents well to how I am now. Who is still pretty much a rookie in life. Who still
				have too much to learn.
			</p>
			<p>
				And, I know I do, I still have a lot to go through in my years of living on my own terms, on
				my own ways. I have a long way to go, obviously I'm in my twenties, so why not blow up my
				life without regrets?
			</p>
		</section>

		<section class="section">
			<h2 class="font-heading">I'm a broadcast engineer.</h2>
			<p><i>well, a junior one at that…</i></p>
			<h3 class="font-heading">BEUS-Esports</h3>
			<p>
				Since freshman year, I've been the Head of Broadcast of the University of Science's Esports
				Club. And since the summer of 2023, I've also been the Head of Broadcast of BEUS Esports.
			</p>
			<p>
				My work at BEUS Esports been quite a lot. I was the Producer, Technical Director, and
				Graphics Operator of many esports event, such as Ho Chi Minh University Esports Tournament
				2024 (TFT, Valorant), FPT Shop University Tour (Valorant), Đà Nẵng Valorant League by Thành
				Đoàn Đà Nẵng, and many other small, community events.
			</p>
			<p>
				Besides the events, I also have worked as an Observer for Garena Vietnam's Arena of Valor
				tournaments, most notably Arena of Valor's International Championship 2023 and 2024.
			</p>
			<img
				src="https://itsrookienguyen.me/wp-content/uploads/2026/04/DSC_0546-1024x680.jpg"
				alt="Broadcast Work"
				class="content-image"
			/>
		</section>

		<section class="section">
			<h2 class="font-heading">I'm a photographer.</h2>
			<p>
				Photography has been a part of me since grade 10, and my first (and now primary) camera is
				Fujifilm X-T20. The film-camera-like body design, the beautiful straight-out-of-camera
				JPEGs, and its flexibility to adjust color settings on the body itself is what sold me in.
			</p>
			<p>
				To see objects, scenery, and a lot of everyday life inside a small frame, to imagine how
				things work in these objects is a thrilling work on its own.
			</p>
			<img
				src="https://itsrookienguyen.me/wp-content/uploads/2026/04/the-film-cam-1024x700.jpg"
				alt="Photography"
				class="content-image"
			/>
		</section>

		<section class="section">
			<h2 class="font-heading">What's this website about?</h2>
			<p>
				One of the biggest reason that motivated me to made this blog is from a content creator
				named Tâm (Instagram, YouTube). Specifically, the YouTube video titled Lý do mình “tài liệu
				hoá” cuộc đời mình (Why I document my life).
			</p>
			<p>
				I'll write about the whole thing later, but in short: I wanted to record my life, to keep my
				thoughts in a place I can reflect in the future, or to jot down quick thoughts that I want
				to share, and so on.
			</p>
			<p>
				I also want to build a space for myself, so that I can learn a little bit of Web
				Development, like those Jamstack sites and all, and also to train my long lost eye of art
				that I only recently found.
			</p>
			<Admonition variant="note">
				<Admonition.Title>Update (15/04/2026)</Admonition.Title>
				<Admonition.Description>
					<p>
						As of right now though, I have basically moved to WordPress for this blog. Feels bad for
						not maintaining that old version, but Svelte 5 broke a lot…
					</p>
				</Admonition.Description>
			</Admonition>
			<p>
				Since this is still considered ever-changing, it may break frequently as this website goes
				through constant changes and updates, and I get less dumb at coding/design in general, and
				in Web Development in particular.
			</p>
		</section>
	</div>
</article>

<style lang="scss">
	.about-page {
		padding-bottom: var(--space-xl);
	}

	.about-header {
		position: relative;
		min-height: 70vh;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding-bottom: var(--space-lg);
		margin-bottom: var(--space-xl);
	}

	.header-image-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;

		.header-image {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		.header-overlay {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(to bottom, rgba(10, 4, 42, 0.2) 0%, var(--color-bg) 100%);
		}
	}

	.header-content {
		position: relative;
		z-index: 10;
		color: var(--color-text);

		h1 {
			font-size: var(--font-size-hero);
			margin: 0 0 var(--space-xs);
		}

		.subtitle {
			font-size: var(--font-size-body);
			opacity: 0.9;
		}
	}

	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 0 var(--space-sm);
	}

	.about-content {
		.section {
			margin-bottom: var(--space-xl);

			h2 {
				margin-bottom: var(--space-md);
			}

			h3 {
				margin: var(--space-lg) 0 var(--space-sm);
			}

			p {
				margin-bottom: var(--space-md);
				line-height: 1.8;
			}

			.content-image {
				width: 100%;
				border-radius: var(--radius-md);
				margin: var(--space-lg) 0;
			}
		}
	}

	@media (max-width: 768px) {
		.about-header {
			min-height: 50vh;
		}
	}
</style>
