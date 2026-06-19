<script lang="ts">
	import { ErrorPage } from '@polumeyv/ui/layout';
	import { page } from '$app/state';
</script>

<ErrorPage status={page.status} message={page.error?.message} class="min-h-screen flex items-center justify-center" />
