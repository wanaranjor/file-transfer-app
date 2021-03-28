<script>
  import UserMultiple24 from "carbon-icons-svelte/lib/UserMultiple24";
  import { dateTimeAmPm } from "../../../helpers/datetime.js";

  export let listUsers;
</script>

<section class="px-3 text-gray-600 bg-white border rounded-lg shadow-xl py-7">
  <div
    class="flex flex-row items-center w-full px-5 mb-3 space-x-3 text-center"
  >
    <UserMultiple24 />
    <h1 class="text-2xl font-semibold text-left text-gray-700">Usuarios</h1>
    <span
      class="px-2 text-sm font-semibold text-white bg-blue-700 rounded-full "
      >{listUsers.length}</span
    >
  </div>
  <div
    class="w-full px-5 mx-auto overflow-auto md:max-h-sm xl:max-h-lg 2xl:max-h-2xl "
  >
    <table class="w-full text-left whitespace-no-wrap table-auto">
      <thead>
        <tr class="">
          <th
            class="px-2 py-3 text-sm font-semibold tracking-wider text-left text-gray-900 bg-gray-100 rounded-tl rounded-bl"
            >Carpeta</th
          >
          <th
            class="px-2 py-3 text-sm font-semibold tracking-wider text-gray-900 bg-gray-100"
            >Responsable</th
          >
          <th
            class="px-2 py-3 text-sm font-semibold tracking-wider text-gray-900 bg-gray-100"
            >Correo</th
          >
          <th
            class="px-2 py-3 text-sm font-semibold tracking-wider text-gray-900 bg-gray-100"
            >Usuario red</th
          >
          <th
            class="px-2 py-3 text-sm font-semibold tracking-wider text-gray-900 bg-gray-100"
            >Creación</th
          >
        </tr>
      </thead>
      <tbody class="text-sm">
        {#if listUsers}
          {#each listUsers as user}
            <tr>
              <td class="px-4 py-2"> {user.area.name} </td>

              <td class="px-4 py-2">
                {user.responsable}
              </td>
              <td class="px-4 py-2">
                {user.email}
              </td>
              <td class="px-4 py-2">
                {user.username}
              </td>
              <td class="px-4 py-2">
                {dateTimeAmPm(user.createdAt)}
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
