<script lang="ts">
	import { ErrorPage } from 'sheer-ui/blocks';
	import { page } from '$app/state';
</script>

<ErrorPage status={page.status} message={page.error?.message} class="min-h-screen flex items-center justify-center" />
