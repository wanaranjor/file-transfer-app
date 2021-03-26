<script>
  import { onMount } from "svelte";
  import { getResources } from "../services/upload.services.js";
  import FormUpload from "./FormUpload.svelte";
  import ListFiles from "./ListFiles.svelte";

  let listFiles = [];

  onMount(async () => {
    listFiles = await getResources();
  });

  const handleUpdate = async () => (listFiles = await getResources());
</script>

<section class="flex flex-row items-center px-5 mx-auto space-x-5">
  <div class="w-full md:w-1/4">
    <FormUpload on:updateListFiles={handleUpdate} />
  </div>
  <div class="md:w-3/4">
    <ListFiles {listFiles} />
  </div>
</section>
