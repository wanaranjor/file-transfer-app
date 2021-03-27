<script context="module">
	import { findUserById } from "../../components/user/services/user.services.js";
	import { userProfile } from "../../components/user/stores/userStore.js";
	export async function preload(page, session) {
		if (!session.user) {
			this.redirect(302, `/`);
		} else {
			const { id } = session.profile;
			const { token } = session.user.data;
			const response = await findUserById(id, token);
			response ? userProfile.update(response) : userProfile.update({});
		}
	}
</script>

<script>
	import Footer from "../../components/shared/ui/Footer.svelte";
	import Header from "../../components/shared/ui/Header.svelte";
</script>

<Header />

<slot />

<Footer />
