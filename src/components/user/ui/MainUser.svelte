<script>
  import { stores } from "@sapper/app";
  import { onMount } from "svelte";
  import { getUsers } from "../services/user.services";
  import FormUser from "./FormUser.svelte";
  import ListUsers from "./ListUsers.svelte";

  const { session } = stores();
  const { token } = $session.user.data;

  const MODEL = process.env.MODEL_USER;

  let listUsers = [];

  onMount(async () => (listUsers = await getUsers(MODEL, token)));
  const handleListUsers = async () =>
    (listUsers = await getUsers(MODEL, token));
</script>

<section class="flex flex-col px-5 space-x-3 md:flex-row">
  <div class="w-full md:w-1/4">
    <FormUser on:updateListUsers={handleListUsers} />
  </div>

  <div class="md:w-3/4">
    <ListUsers {listUsers} />
  </div>
</section>
