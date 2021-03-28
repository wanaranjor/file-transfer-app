<script context="module">
	import { getProfile } from "../components/shared/services/shared.services";
	import { infoProfile } from "../components/shared/stores/shared.storage";
	export async function preload({ user }, session) {
		const response = await getProfile();
		infoProfile.set(response);
	}
</script>

<svelte:head>
	<title>Transferecia Archivos</title>
</svelte:head>

<main class="flex flex-col min-h-screen bg-gray-100">
	<slot />
</main>
