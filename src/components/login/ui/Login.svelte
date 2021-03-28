<script>
  import { NotificationDisplay, notifier } from "@beyonk/svelte-notifications";
  import { infoProfile } from "../../shared/stores/shared.storage";
  import Hero from "../../shared/ui/Hero.svelte";
  import { loginUser } from "../services/login.services";
  import { isEmpty, isValidEmail } from "./../../../helpers/validators";

  let email,
    password = "";

  $: formIsValid = isValidEmail(email) && isEmpty(password);

  const handleSubmit = async () => {
    const response = await loginUser(email, password);
    if (!response.error) {
      window.location.href = "/dashboard";
    } else {
      notifier.danger(
        `Usuario o contraseña invalidos. Intente nuevamente.`,
        5000
      );
      email = "";
      password = "";
    }
  };
</script>

<NotificationDisplay />
<section class="flex flex-col items-center h-screen md:flex-row">
  <div
    class="hidden w-full h-screen bg-white md:items-center md:w-1/3 xl:w-2/3 md:flex"
  >
    <Hero />
  </div>
  <div
    class="flex items-center justify-center w-full h-screen px-6 bg-blue-1300 md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12"
  >
    <div class="flex flex-col items-center w-full h-100">
      <img src="logo.webp" alt="logo" class="w-3/4" />
      <h1
        class="mt-12 text-2xl font-semibold tracking-tighter text-center text-gray-900 sm:text-3xl"
      >
        {$infoProfile.titleApp}
      </h1>
      <form class="w-full mt-6" on:submit|preventDefault={handleSubmit}>
        <div>
          <label
            class="block font-medium leading-relaxed tracking-tighter text-gray-700 text-md"
            for="email"
            >Correo
          </label>
          <input
            type="text"
            name="email"
            id="email"
            bind:value={email}
            class="w-full px-4 py-2 mt-2 text-base text-gray-700 bg-gray-100 border border-gray-300 focus:bg-white focus:ring-3 focus:outline-none focus:border-blue-700 focus:ring-blue-70"
          />
        </div>
        <div class="mt-4">
          <label
            class="block font-medium leading-relaxed tracking-tighter text-gray-700 text-md"
            for="password"
            >Contraseña
          </label>
          <input
            type="password"
            name="password"
            bind:value={password}
            minlength="6"
            class="w-full px-4 py-2 mt-2 text-base text-gray-700 bg-gray-100 border border-gray-300 focus:bg-white focus:ring-3 focus:outline-none focus:border-blue-700 focus:ring-blue-700"
          />
        </div>
        <!-- TODO: pending create functionality -->
        <!-- <div class="mt-2 text-right">
          <a
            href="/"
            class="text-sm font-semibold leading-relaxed text-gray-700 hover:text-blue-700 focus:text-blue-700"
            >¿Olvidó su Contraseña?</a
          >
        </div> -->
        <button
          class={formIsValid
            ? "btn my-3"
            : "btn opacity-50 cursor-not-allowed my-4"}
          disabled={!formIsValid}
          type="submit"
          >Ingresar
        </button>
      </form>
      <hr class="w-full my-6 border-gray-300" />
    </div>
  </div>
</section>
