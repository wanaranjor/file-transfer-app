<script>
  import Layers32 from "carbon-icons-svelte/lib/Layers32";
  import { infoProfile } from "./../stores/shared.storage.js";
  import Navbar from "./Navbar.svelte";
</script>

<header class="text-gray-600">
  <div class="flex flex-wrap items-center p-5">
    <a
      href="/"
      class="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0"
    >
      <Layers32 class="p-1 text-white bg-blue-700 rounded-full" />
      <span class="ml-3 text-xl font-bold">{$infoProfile.titleApp}</span>
    </a>
    <Navbar />
  </div>
</header>
