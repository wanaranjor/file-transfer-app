<script context="module">
	export async function preload({ user }, session) {
		if (session.user) {
			this.redirect(302, `/dashboard`);
		}
	}
</script>

<script>
	import { stores } from "@sapper/app";
	import Login from "../components/login/ui/Login.svelte";
	const { session } = stores();
	// console.log($session.user);
</script>

<!-- <script>
	import Login from "../components/login/ui/Login.svelte";
import FormUpload from "../components/Upload/ui/FormUpload.svelte";
	import Hero from "../components/Upload/ui/Hero.svelte";
	import ListFiles from "../components/Upload/ui/ListFiles.svelte";
</script>

<svelte:head>
	<title>Transfer Files</title>
</svelte:head>

<section class="container flex flex-row items-center h-screen mx-auto">
	<div class="w-full md:w-1/3">
		<FormUpload />
	</div>
	<div class="md:w-2/3">
		<Hero />
		<ListFiles />
	</div>
</section> -->

<Login />
