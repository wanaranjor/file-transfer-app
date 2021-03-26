<script context="module">
	export async function preload({ user }, session) {
		if (session.user) {
			this.redirect(302, `/dashboard`);
		}
	}
</script>

<script>
	import Login from "../components/login/ui/Login.svelte";
</script>

<Login />
