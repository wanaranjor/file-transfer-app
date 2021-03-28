<script>
  import { stores } from "@sapper/app";
  import { onMount } from "svelte";
  import { userProfile } from "../../user/stores/userStore";
  import { getResources } from "../services/upload.services.js";
  import DownloadFile from "./DownloadFile.svelte";
  import FormUpload from "./FormUpload.svelte";
  import ListFiles from "./ListFiles.svelte";

  const { session } = stores();
  const { token } = $session.user.data;

  let listFiles = [];
  let areadId = $userProfile.areaId;
  let viewDownload = false;
  let urlDownloadFile,
    file = "";

  onMount(async () => {
    listFiles = await getResources(areadId, token);
  });

  const handleDownload = (event) => {
    viewDownload = true;
    urlDownloadFile = event.detail.linkDownload;
    file = event.detail.file;
  };

  const handleCloseDownload = () => {
    viewDownload = false;
    urlDownloadFile = "";
    file = "";
  };

  const handleUpdate = async () =>
    (listFiles = await getResources(areadId, token));
</script>

<section class="flex flex-row items-start px-5 mx-auto space-x-5">
  <div class="flex flex-col w-full md:w-1/4">
    {#if viewDownload}
      <DownloadFile
        {urlDownloadFile}
        {file}
        on:closeDownload={handleCloseDownload}
      />
    {/if}
    <FormUpload on:updateListFiles={handleUpdate} />
  </div>
  <div class="md:w-3/4">
    <ListFiles {listFiles} on:blobFile={handleDownload} />
  </div>
</section>
