<script>
  import { dateTimeAmPm } from "../../../helpers/datetime.js";
  import DocumentTasks20 from "carbon-icons-svelte/lib/DocumentTasks20";
  import ChevronRight20 from "carbon-icons-svelte/lib/ChevronRight20";
  import Calendar20 from "carbon-icons-svelte/lib/Calendar20";
  import User20 from "carbon-icons-svelte/lib/User20";

  export let urlDownloadFile;
  export let file;
</script>

<div class="flex flex-col p-5 my-3 bg-white border rounded-lg shadow-xl">
  <div class="flex flex-col p-3 my-3 text-gray-700 border rounded-lg">
    <div class="flex flex-row items-center py-2 space-x-3">
      <DocumentTasks20 />
      <p class="font-bold leading-tight">
        {file.fileName}
      </p>
    </div>
    <div class="flex flex-row items-center pb-2 space-x-3">
      <User20 />
      <p>{file.user.responsable}</p>
    </div>
    <div class="flex flex-row items-center pb-2 space-x-3">
      <Calendar20 />
      <p>{dateTimeAmPm(file.createdAt)}</p>
    </div>
    <div class="flex flex-row items-center pb-2 space-x-3">
      <ChevronRight20 />
      <p>{file.fileType}</p>
    </div>
    <div class="flex flex-row items-center space-x-3 pb-">
      <ChevronRight20 />
      <p>{(file.fileSize / 1000).toFixed(1)} Kb</p>
    </div>
  </div>
  <a
    href={urlDownloadFile}
    class="w-full text-center btn"
    download={file.fileUrl}>Descargar</a
  >
</div>
