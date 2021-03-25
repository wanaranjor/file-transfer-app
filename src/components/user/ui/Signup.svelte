<script>
  // import { addUser } from "../services/signup.services";
  import { isEmpty, isValidEmail } from "../../../helpers/validators";
  import { NotificationDisplay, notifier } from "@beyonk/svelte-notifications";
  import { getInfoModel } from "../../shared/services/shared.services";
  import { onMount } from "svelte";

  const MODEL = process.env.MODEL_AREA;

  let areas = [];
  let userName,
    area,
    responsable,
    email,
    password = "";

  onMount(async () => {
    areas = await getInfoModel(MODEL);
    areas = areas.sort();
  });

  $: formIsValid =
    isEmpty(userName) &&
    isEmpty(area) &&
    isNumber(numeroDoc) &&
    isValidEmail(email) &&
    isEqualPassword(password, conPassword);

  const handleSubmit = async () => {
    if (formIsValid) {
      let result = await addUser(userName, area, numeroDoc, email, password);
      if (result === 200) {
        formIsValid = false;
        notifier.success(
          `Registro creado correctamente. Pulse en Ingresar para terminar su proceso de registro.`,
          7000
        );
        userName = "";
        area = "";
        numeroDoc = "";
        email = "";
        password = "";
        conPassword = "";
      } else {
        notifier.danger("Algo salio mal, verifique nuevamente.", 5000);
      }
      if (result === 403) {
        notifier.danger(
          "El número de documento ya se encuentra registrado.",
          5000
        );
      }
    }
  };
</script>

<NotificationDisplay />
<section class="flex flex-col px-5 space-x-3 md:flex-row">
  <div class="flex w-full bg-white border rounded-lg shadow-xl p-7 md:w-1/4">
    <form class="w-full" on:submit|preventDefault={handleSubmit}>
      <div class="flex flex-col">
        <div class="w-full mb-4">
          <label class="label-form" for="userName">1. Usuario </label>
          <input
            type="text"
            bind:value={userName}
            class="input-form"
            required
          />
        </div>
        <div class="w-full mb-4">
          <label class="label-form" for="area"> 2. Aréa </label>
          <!-- TODO: cargar opciones del Select desde API -->
          <select bind:value={area} class="text-xs input-form" required>
            <option value="" select>-------</option>
            {#each areas as area}
              <option value={area.id}>{area.name}</option>
            {/each}
          </select>
        </div>
        <div class="w-full mb-4">
          <label class="label-form" for="email">3. Correo Eléctronico </label>
          <input
            type="email"
            bind:value={email}
            class="lowercase input-form"
            required
          />
        </div>
        <div class="w-full mb-4">
          <label class="label-form" for="responsable">4. Responsable </label>
          <input
            type="text"
            bind:value={responsable}
            class="input-form"
            required
          />
        </div>
        <div class="w-full mb-4">
          <div class="">
            <label class="label-form" for="password">5. Contraseña </label>
            <input
              type="password"
              bind:value={password}
              class="input-form"
              required
            />
          </div>
        </div>
        <div class="w-full mb-4">
          <label class="label-form" for="email">7. Correo Eléctronico </label>
          <input
            type="email"
            bind:value={email}
            class="lowercase input-form"
            required
          />
        </div>
      </div>
      <div class="flex flex-col">
        <button
          class={formIsValid ? "btn" : "btn opacity-50 cursor-not-allowed"}
          disabled={!formIsValid}
          type="submit">Registrarte</button
        >
      </div>
    </form>
  </div>
  <div class="flex w-full bg-white border rounded-lg shadow-lg p-7 md:w-3/4">
    sdfsdf
  </div>
</section>
