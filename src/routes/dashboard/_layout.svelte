<script context="module">
	export async function preload({ user }, session) {
		if (!session.user) {
			this.redirect(302, `/`);
		}
	}
</script>

<script>
	import Header from "../../components/shared/ui/Header.svelte";
</script>

<Header />

<slot />
