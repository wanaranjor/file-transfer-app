<script>
  import { stores } from "@sapper/app";
  import { onMount } from "svelte";
  import { userProfile } from "../../user/stores/userStore";
  import { getResources } from "../services/upload.services.js";
  import FormUpload from "./FormUpload.svelte";
  import ListFiles from "./ListFiles.svelte";

  const { session } = stores();
  const { token } = $session.user.data;

  let listFiles = [];
  let areadId = $userProfile.areaId;

  onMount(async () => {
    listFiles = await getResources(areadId, token);
  });

  const handleUpdate = async () =>
    (listFiles = await getResources(areadId, token));
</script>

<section class="flex flex-row items-center px-5 mx-auto space-x-5">
  <div class="w-full md:w-1/4">
    <FormUpload on:updateListFiles={handleUpdate} />
  </div>
  <div class="md:w-3/4">
    <ListFiles {listFiles} />
  </div>
</section>
