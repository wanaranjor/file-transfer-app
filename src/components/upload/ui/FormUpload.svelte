<script>
  import { stores } from "@sapper/app";
  import { createEventDispatcher } from "svelte";
  import { isEmpty } from "../../../helpers/validators";
  import { uploadFile, addResource } from "../services/upload.services.js";
  import { valueProgressBar } from "../stores/upload.storage";
  import { NotificationDisplay, notifier } from "@beyonk/svelte-notifications";
  import { userProfile } from "../../user/stores/userStore";
  import AddFilled32 from "carbon-icons-svelte/lib/AddFilled32";
  import DocumentTasks20 from "carbon-icons-svelte/lib/DocumentTasks20";
  import ChevronRight20 from "carbon-icons-svelte/lib/ChevronRight20";

  const { session } = stores();
  const { token } = $session.user.data;

  const dispatch = createEventDispatcher();

  const areaId = $userProfile.areaId;
  const folder = $userProfile.area.name;
  const userId = $userProfile.id;

  let formData = null;
  let file,
    message,
    fileName,
    fileType,
    fileUrl = "";
  let fileSize = 0;
  let viewDetailsFile = false;

  $: formIsValid = isEmpty(file) && isEmpty(message);

  const handleChange = (event) => {
    viewDetailsFile = true;
    formData = new FormData(event.target.form);
    const { name, type, size } = formData.get("file");
    fileName = name;
    fileType = type;
    fileSize = size;
  };

  const handleClean = () => {
    formData = null;
    formIsValid = false;
    viewDetailsFile = false;
    file = "";
    message = "";
    fileName = "";
    fileType = "";
    fileUrl = "";
    fileSize = 0;
  };

  const handleSubmit = async (event) => {
    if (formIsValid) {
      const formData = new FormData(event.target);
      const response = await uploadFile(formData, folder, token);
      if (response.status === 200) {
        formIsValid = false;
        fileUrl = response.data.filename;
        await addResource(
          fileName,
          fileType,
          fileSize,
          fileUrl,
          userId,
          areaId,
          token
        );
        dispatch("updateListFiles");
        notifier.success(`Archivo enviado correctamente`, 5000);
      } else {
        valueProgressBar.set(0);
        notifier.danger(
          `Error [${response.statusCode}]: ${response.message} - El tipo de archivo no se puede transmitir, verifique nuevamente.`,
          5000
        );
      }
    }
  };
</script>

<NotificationDisplay />

<form
  class="p-5 my-3 bg-white border rounded-lg shadow-xl"
  on:submit|preventDefault={handleSubmit}
>
  <div class="py-2">
    <label
      class="flex flex-row items-center space-x-3 cursor-pointer label-form"
      for="file"
    >
      <AddFilled32 class="text-blue-700" />
      <span class="text-xl font-semibold">Seleccionar archivo</span>
    </label>
    <input
      id="file"
      class="hidden bg-gray-100"
      type="file"
      name="file"
      bind:value={file}
      on:change={handleChange}
    />
  </div>
  {#if viewDetailsFile}
    <div class="flex flex-col p-3 my-3 text-gray-700 border rounded-lg">
      <div class="flex flex-row items-center py-2 space-x-3">
        <DocumentTasks20 />
        <p class="font-bold leading-tight">
          {fileName}
        </p>
      </div>
      <div class="flex flex-row items-center pb-2 space-x-3">
        <ChevronRight20 />
        <p>{fileType}</p>
      </div>
      <div class="flex flex-row items-center space-x-3 pb-">
        <ChevronRight20 />
        <p>{(fileSize / 1000).toFixed(1)} Kb</p>
      </div>
    </div>
  {/if}
  <div class="py-2">
    <label class="label-form" for="email">Mensaje </label>
    <textarea
      type="textarea"
      rows="3"
      bind:value={message}
      class="input-form"
    />
  </div>
  <div class="flex flex-col py-2">
    {#if $valueProgressBar > 0}
      <div clas="flex flex-col">
        <p class="text-right label-form">{$valueProgressBar} %</p>
        <progress value={$valueProgressBar} max="100" class="w-full" />
      </div>
    {/if}
    <div class="flex flex-row justify-between space-x-3">
      <button
        class={formIsValid
          ? "btn mt-4"
          : "btn opacity-50 cursor-not-allowed mt-4"}
        disabled={!formIsValid}
        type="submit">Enviar</button
      >
      <button class="mt-4 btn-gray" on:click={handleClean}>Limpiar</button>
    </div>
  </div>
</form>
