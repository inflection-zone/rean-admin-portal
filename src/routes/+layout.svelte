<script lang="ts">
	import '@skeletonlabs/skeleton/styles/all.css';
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { initFlash } from 'sveltekit-flash-message/client';
	import toast, { Toaster } from 'svelte-french-toast';
	import '../theme.css';
	import '../app.postcss';

	//////////////////////////////////////////////////////////////////////////////
	
	const flash = initFlash(page);
	beforeNavigate((nav) => {
		if ($flash && nav.from?.url.toString() != nav.to?.url.toString()) {
			$flash = undefined;
		}
	});

	flash.subscribe(($flash) => {
		if (!$flash) return;

		toast($flash.message, {
			icon: $flash.type == 'success' ? '✅' : '❌'
		});

		flash.set(undefined);
	});
</script>

<Toaster />
<slot />
