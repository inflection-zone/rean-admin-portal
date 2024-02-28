<script lang="ts">
    import type { PageServerData } from './$types';
    import SuperAdminDashboard from '$lib/components/dashboard/super.admin.dashboard.svelte';

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    export let data: PageServerData;

    console.log('RESPONSE', data);
    
</script>

<SuperAdminDashboard {data} />
