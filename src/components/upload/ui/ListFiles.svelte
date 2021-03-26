<script>
  import { dateTimeAmPm } from "../../../helpers/datetime.js";
  import DocumentDownload24 from "carbon-icons-svelte/lib/DocumentDownload24";
  import CopyFile24 from "carbon-icons-svelte/lib/CopyFile24";

  export let listFiles;
</script>

<section
  class="px-3 my-3 text-gray-600 bg-white border rounded-lg shadow-xl py-7"
>
  <div
    class="flex flex-row items-center w-full px-5 mb-3 space-x-3 text-center"
  >
    <CopyFile24 />
    <h1 class="text-2xl font-semibold text-left text-gray-700">
      Archivos transferidos
    </h1>
    <span class="p-1 text-sm font-semibold text-white bg-blue-700"
      >{listFiles.length}</span
    >
  </div>
  <div
    class="w-full px-5 mx-auto overflow-auto md:max-h-sm xl:max-h-lg 2xl:max-h-2xl "
  >
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
        {#if listFiles}
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
              <!-- TODO: sacar nombre de usuario del Store Global -->
              <td class="px-4 py-2"> Wilson Andrés Naranjo Romero </td>
              <td class="flex justify-center px-4 py-2">
                <a
                  href="http://localhost:3001/files/telem/{file.fileUrl}"
                  class="text-center "><DocumentDownload24 /></a
                >
              </td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
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
