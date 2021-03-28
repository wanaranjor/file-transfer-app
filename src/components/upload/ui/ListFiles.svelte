<script>
  import { stores } from "@sapper/app";
  import FolderAdd24 from "carbon-icons-svelte/lib/FolderAdd24";
  import SettingsCheck24 from "carbon-icons-svelte/lib/SettingsCheck24";
  import { createEventDispatcher } from "svelte";
  import { userProfile } from "../../../components/user/stores/userStore.js";
  import { dateTimeAmPm, dateTimeNowAmPm } from "../../../helpers/datetime.js";
  import { getResourceById } from "../../download/services/download.services.js";
  import Spinner from "./../../shared/ui/Spinner.svelte";

  export let listFiles;
  const dispatch = createEventDispatcher();

  const { session } = stores();
  const { token } = $session.user.data;
  const folder = $userProfile.area.name;

  const handleDownload = async (file) => {
    const blobFile = await getResourceById(file.fileUrl, folder, token);
    const linkDownload = URL.createObjectURL(blobFile.data);
    dispatch("blobFile", { linkDownload, file });
  };
</script>

<section
  class="px-3 my-3 text-gray-600 bg-white border rounded-lg shadow-xl py-7"
>
  <div
    class="flex flex-row items-center justify-between w-full px-5 mb-3 text-center"
  >
    <div class="flex flex-row items-center space-x-3">
      <FolderAdd24 />
      <h1 class="text-xl font-semibold text-left text-gray-700">
        {$userProfile.area.name}
      </h1>
      <span
        class="px-2 text-sm font-semibold text-white bg-blue-700 rounded-full"
        >{listFiles.length > 0 ? listFiles.length : 0}</span
      >
    </div>
    <span class="px-3 leading-tight">{dateTimeNowAmPm()}</span>
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
              class="px-2 py-3 text-sm font-semibold tracking-wider text-gray-900 bg-gray-100 rounded-tr rounded-br"
              >Obtener</th
            >
            <th
              class="px-2 py-3 text-sm font-semibold tracking-wider text-left text-gray-900 bg-gray-100 rounded-tl rounded-bl"
              >Nombre archivo</th
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
              >Responsable</th
            >
            <th
              class="px-2 py-3 text-sm font-semibold tracking-wider text-gray-900 bg-gray-100"
              >Mensaje</th
            >
          </tr>
        </thead>
        <tbody class="text-sm">
          {#each listFiles as file}
            <tr>
              <td class="flex justify-center px-4 py-2">
                <button on:click={handleDownload(file)} class="text-center "
                  ><SettingsCheck24 />
                </button>
              </td>
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
              <td class="px-4 py-2"> {file.message ? file.message : ""} </td>
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
