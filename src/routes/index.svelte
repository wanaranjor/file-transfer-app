<script>
	import FormUpload from "../components/Upload/ui/FormUpload.svelte";
	import Hero from "../components/Upload/ui/Hero.svelte";
</script>

<svelte:head>
	<title>Transfer Files</title>
</svelte:head>

<section class="container flex flex-row items-center h-screen mx-auto">
	<div class="w-full md:w-1/3">
		<FormUpload />
	</div>
	<div class="hidden md:w-2/3">
		<Hero />
	</div>
</section>
