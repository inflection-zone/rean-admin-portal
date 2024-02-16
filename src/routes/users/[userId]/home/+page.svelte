<script lang="ts">
    import type { PageServerData } from './$types';
    import SuperAdminDashboard from '$lib/components/dashboard/super.admin.dashboard.svelte';

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    export let data: PageServerData;
    
</script>

<!-- <SuperAdminDashboard {data} /> -->

<p class="text-3xl text-center font-bold text-blue-500">Welcome to Rean ! </p>
