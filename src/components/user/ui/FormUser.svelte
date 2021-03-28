<script>
  import { stores } from "@sapper/app";
  // import { addUser } from "../services/signup.services";
  import { isEmpty, isValidEmail } from "../../../helpers/validators";
  import { NotificationDisplay, notifier } from "@beyonk/svelte-notifications";
  import { getInfoModel } from "../../shared/services/shared.services";
  import { onMount } from "svelte";
  import { addUser } from "../services/user.services";

  const { session } = stores();
  const { token } = $session.user.data;

  const MODEL = process.env.MODEL_AREA;

  let areas = [];
  let username,
    areaId,
    responsable,
    email,
    password = "";

  onMount(async () => {
    areas = await getInfoModel(MODEL, token);
  });

  $: formIsValid =
    isEmpty(username) &&
    isEmpty(areaId) &&
    isEmpty(responsable) &&
    isValidEmail(email) &&
    isEmpty(password);

  const handleSubmit = async () => {
    if (formIsValid) {
      let result = await addUser(
        username,
        areaId,
        responsable,
        email,
        password,
        token
      );
      if (result === 200) {
        formIsValid = false;
        notifier.success(
          `Registro creado correctamente. Pulse en Ingresar para terminar su proceso de registro.`,
          7000
        );
        username = "";
        areaId = "";
        responsable = "";
        email = "";
        password = "";
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

<form
  class="w-full bg-white border rounded-lg shadow-xl p-7"
  on:submit|preventDefault={handleSubmit}
>
  <div class="flex flex-col">
    <div class="w-full mb-4">
      <label class="label-form" for="username">1. Usuario de red </label>
      <input type="text" bind:value={username} class="input-form" required />
    </div>
    <div class="w-full mb-4">
      <label class="label-form" for="area"> 2. Aréa </label>
      <select bind:value={areaId} class="text-xs input-form" required>
        <option value="" select>-------</option>
        {#each areas as area}
          <option value={area.id}>{area.name}</option>
        {/each}
      </select>
    </div>
    <div class="w-full mb-4">
      <label class="label-form" for="responsable">3. Nombre Responsable </label>
      <input type="text" bind:value={responsable} class="input-form" required />
    </div>
    <div class="w-full mb-4">
      <label class="label-form" for="email">4. Correo Eléctronico </label>
      <input
        type="email"
        bind:value={email}
        class="lowercase input-form"
        required
      />
    </div>
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

  <div class="flex flex-col">
    <button
      class={formIsValid ? "btn" : "btn opacity-50 cursor-not-allowed"}
      disabled={!formIsValid}
      type="submit">Crear Usuario</button
    >
  </div>
</form>
