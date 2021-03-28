<script>
  import { infoProfile } from "../../shared/stores/shared.storage";
</script>

<div
  class="container flex flex-col items-center justify-center px-5 mx-auto text-gray-600"
>
  <img
    class="object-cover object-center w-5/6 mb-10 rounded lg:w-2/6 md:w-3/6"
    alt="hero"
    src="upload.svg"
  />
  <div class="w-full text-center lg:w-2/3">
    <h1 class="mb-4 text-3xl font-medium text-gray-900 sm:text-4xl">
      {$infoProfile.titleHome}
    </h1>
    <p class="mb-8 leading-relaxed">
      {$infoProfile.textHome}
    </p>
  </div>
</div>
