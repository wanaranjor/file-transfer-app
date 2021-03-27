<script>
  import { stores } from "@sapper/app";
  import Spinner from "./../../shared/ui/Spinner.svelte";
  import { dateTimeAmPm } from "../../../helpers/datetime.js";
  import DocumentDownload24 from "carbon-icons-svelte/lib/DocumentDownload24";
  import { userProfile } from "../../../components/user/stores/userStore.js";
  import { getResourceById } from "../../download/services/download.services.js";
  import FolderAdd24 from "carbon-icons-svelte/lib/FolderAdd24";

  export let listFiles;

  const { session } = stores();
  const { token } = $session.user.data;
  const folder = $userProfile.area.name;

  const API_URL = process.env.API_URL;

  const handleDownload = async (fileName) => {
    const response = await getResourceById(fileName, folder, token);
    console.log(response);
  };
</script>

<section
  class="px-3 my-3 text-gray-600 bg-white border rounded-lg shadow-xl py-7"
>
  <div
    class="flex flex-row items-center w-full px-5 mb-3 space-x-3 text-center"
  >
    <FolderAdd24 />
    <h1 class="text-xl font-semibold text-left text-gray-700">
      {$userProfile.area.name}
    </h1>
    <span class="px-2 text-sm font-semibold text-white bg-blue-700 rounded-full"
      >{listFiles.length > 0 ? listFiles.length : 0}</span
    >
  </div>
  <div
    class="w-full px-5 mx-auto overflow-auto md:max-h-sm xl:max-h-lg 2xl:max-h-2xl "
  >
    {#if listFiles.length === 0}
      <div class="flex flex-col justify-center text-center">
        <Spinner />
        <p>No existen archivos para esta consulta.</p>
      </div>
    {:else}
      <table class="w-full text-left whitespace-no-wrap table-auto">
        <thead>
          <tr class="text-center">
            <th
              class="px-2 py-3 text-sm font-semibold tracking-wider text-left text-gray-900 bg-gray-100 rounded-tl rounded-bl"
              >Nombre</th
            >
            <th
              class="px-2 py-3 text-sm font-semibold tracking-wider text-gray-900 bg-gray-100"
              >Tamaño</th
            >
            <th
              class="px-2 py-3 text-sm font-semibold tracking-wider text-gray-900 bg-gray-100"
              >Fecha</th
            >
            <th
              class="px-2 py-3 text-sm font-semibold tracking-wider text-gray-900 bg-gray-100"
              >Usuario</th
            >
            <th
              class="px-2 py-3 text-sm font-semibold tracking-wider text-gray-900 bg-gray-100 rounded-tr rounded-br"
              >Descarga</th
            >
          </tr>
        </thead>
        <tbody class="text-sm">
          {#each listFiles as file}
            <tr>
              <td class="px-4 py-2">
                {file.fileName}
              </td>
              <td class="px-4 py-2">
                {(file.fileSize / 1000).toFixed(1)} Kb
              </td>
              <td class="px-4 py-2">
                {dateTimeAmPm(file.createdAt)}
              </td>
              <td class="px-4 py-2"> {file.user.responsable} </td>
              <td class="flex justify-center px-4 py-2">
                <a
                  href="{API_URL}/files/{$userProfile.area.name}/{file.fileUrl}"
                  class="text-center "><DocumentDownload24 /></a
                >
                <button
                  on:click={handleDownload(file.fileUrl)}
                  class="text-center "
                  ><DocumentDownload24 />
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
  <!-- <div class="flex w-full pl-4 mx-auto mt-4 ">
    <a href="/" class="inline-flex items-center text-indigo-500 md:mb-2 lg:mb-0"
      >Learn More
      <svg
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        class="w-4 h-4 ml-2"
        viewBox="0 0 24 24"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </a>
    <button
      class="flex px-6 py-2 ml-auto text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600"
      >Button</button
    >
  </div> -->
</section>
