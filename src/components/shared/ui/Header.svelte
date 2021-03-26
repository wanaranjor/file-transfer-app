<script>
  import Navbar from "./Navbar.svelte";
  import Layers32 from "carbon-icons-svelte/lib/Layers32";

  const titleApp = process.env.TITLE_APP;
</script>

<header class="text-gray-600">
  <div class="flex flex-col flex-wrap items-center p-5 md:flex-row">
    <a
      href="/"
      class="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0"
    >
      <Layers32 class="p-1 text-white bg-blue-700 rounded-full" />
      <span class="ml-3 text-xl font-bold">{titleApp}</span>
    </a>
    <Navbar />
  </div>
</header>
