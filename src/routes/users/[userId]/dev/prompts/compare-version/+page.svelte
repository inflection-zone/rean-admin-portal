<script lang="ts">
    import { page } from '$app/stores';
    import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
    import Icon from '@iconify/svelte';
    import TextDiff from '$lib/components/text-diff.svelte';
    import { enhance } from '$app/forms';

    export let textA = `The suns slowly dipped below the horizon, 
    casting hues of orange and 
    pink across the sky.
    The suns slowly dipped below the horizon, 
    casting hues of orange and 
    The suns slowly dipped below the horizon, 
    casting hues of orange and 
    dcewewewfewewewffdfdse
    The sun slowly dipped below the horizon, 
    casting hues of orange and 
    pink across the sky.
    The suns slowly dipped below the horizon,
    The sun slowly dipped below the horizon, 
    casting hues of orange and 
    pink across the sky.
    The suns slowly dipped below the horizon,
    `;

    export let versionA = 'v1';
    export let versionB = 'v2';

    export let textB = `The sun slowly dipped below the horizon, 
    casting hues of orange and 
    pink across the sky.
    The suns slowly dipped below the horizon, 
    casting hues of orange and 
    The suns slowly dipped below the horizon, 
    casting hues of orange and 
    pink across the sky.
    dvdsdsdsdsds
    The sun slowly dipped below the horizon, 
    casting hues of orange and 
    pink across the sky.
    The suns slowly dipped below the horizon,
    The sun slowly dipped below the horizon, 
    casting hues of orange and 
    pink across the sky.
    The suns slowly dipped below the horizon, 
    `;

    export let title = 'Prompt';

    export let form;
    const userId = $page.params.userId;
    const createRoute = `/users/${userId}/assessment-templates/create`;
    const assessmentsRoutes = `/users/${userId}/assessment-templates`;
    
    let day1 = '2 Days Ago';
    let day2 = '8 Days Ago';

    const breadCrumbs = [
        { name: 'Prompts', path: assessmentsRoutes },
        { name: 'Compare Prompt Version', path: createRoute }
    ];

</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
    method="post"
    action="?/createNotificationAction"
    class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
    use:enhance
>
    <div class="table">
        <thead class="!variant-soft-secondary">
            <tr>
                <div>
                    <th>Prompt</th>
                    <th>QuestionAnswer_Master</th>
                </div>
                <th class="p-3 text-right">
                    <a
                        href={assessmentsRoutes}
                        class="btn p-2 -my-2 variant-soft-secondary"
                    >
                        <Icon
                            icon="material-symbols:close-rounded"
                            class="text-lg"
                        />
                    </a>
                </th>
            </tr>
        </thead>
    </div>
<div class="box-border border-0 bg-zinc-200 m-25 p-4 border-spacing-3 relative overflow-y-auto max-h-[412px]">
    <TextDiff {textA} {versionA} {textB} {versionB} {title} />
</div>
<div class="flex justify-around gap-4 mt-3 h-10">
        <div>{day1}</div>
        <div>{day2}</div>
    </div>
</form> 