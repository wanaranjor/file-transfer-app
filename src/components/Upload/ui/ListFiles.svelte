<script>
  import { onMount } from "svelte";
  import { getResources } from "../services/upload.services.js";

  let listFiles = [];

  onMount(async () => {
    listFiles = await getResources();
    console.log(listFiles);
  });
</script>

{#if listFiles}
  {#each listFiles as file}
    <ul>
      <li>
        <a href="http://localhost:3001/files/telem/{file.fileUrl}">Descarga</a>
      </li>
    </ul>
  {/each}
{/if}
