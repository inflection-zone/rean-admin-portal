<script lang="ts">
	import '@skeletonlabs/skeleton/styles/all.css';
	import Toasts from '$lib/components/toast/toasts.svelte';
	import { beforeNavigate } from '$app/navigation';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import { page } from '$app/stores';
	import '../theme.css';
	import '../app.postcss';

	beforeNavigate(() => {
		console.log(`previous URL: ` + $page.url.href);
		LocalStorageUtils.setItem('prevUrl', $page.url.href);
	});
</script>

<Toasts />
<slot />
