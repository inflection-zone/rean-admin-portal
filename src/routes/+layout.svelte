<script lang="ts">
  import '../app.postcss';
  import Toasts from '$lib/components/toast/toasts.svelte';
  import { beforeNavigate } from '$app/navigation';
  import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
  import { page } from '$app/stores';
  import { Footer, FooterCopyright, FooterLinkGroup, FooterLink } from 'flowbite-svelte'
  beforeNavigate(() => {
    console.log(`previous URL: ` + $page.url.href);
    LocalStorageUtils.setItem('prevUrl', $page.url.href);
  });
</script>

<Toasts />
<slot />
<footer class="text-center w-full fixed bottom-0 h-11 bg-primary">
  <a href="https://reanfoundation.org">
    <p class="mt-3 text-base-100 text-sm hover:underline-offset-3 hover:underline decoration-indigo-500">
      &#xa9; 2022 REAN Foundation
    </p></a
  >
</footer>
