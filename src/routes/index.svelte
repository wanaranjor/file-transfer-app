<script>
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
</section>
