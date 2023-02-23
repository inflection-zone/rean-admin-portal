<script lang="ts">
  import '../theme.css';
	import '@skeletonlabs/skeleton/styles/all.css';
  import '../app.postcss';
  import Toasts from '$lib/components/toast/toasts.svelte';
  import { beforeNavigate } from '$app/navigation';
  import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
  import { page } from '$app/stores';
  beforeNavigate(() => {
    console.log(`previous URL: ` + $page.url.href);
    LocalStorageUtils.setItem('prevUrl', $page.url.href);
  });
</script>
<Toasts />
<body class="">
  <slot />
</body>

