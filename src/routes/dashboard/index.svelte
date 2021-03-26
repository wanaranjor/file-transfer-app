<script context="module">
  import { findUserById } from "../../components/user/services/user.services.js";
  import { userProfile } from "../../components/user/stores/userStore.js";
  export async function preload(page, session) {
    const { id } = session.profile;
    const { token } = session.user.data;
    const response = await findUserById(id, token);
    response ? userProfile.update(response) : userProfile.update({});
  }
</script>

<script>
  import MainUpload from "../../components/upload/ui/MainUpload.svelte";
</script>

<MainUpload />
