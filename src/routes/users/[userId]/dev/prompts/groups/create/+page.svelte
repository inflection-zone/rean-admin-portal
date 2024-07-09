<script lang="ts">
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';
    import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
    import Icon from '@iconify/svelte';

    ////////////////////////////////////////////////////////////////////////////////

    export let form;
    const userId = $page.params.userId;
    const createRoute = `/users/${userId}/dev/prompts/groups/create`;
    const groupsRoute = `/users/${userId}/dev/prompts/groups`;

    const breadCrumbs = [
        { name: 'Groups', path: groupsRoute },
        { name: 'Create', path: createRoute }
    ];
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
    method="post"
    action="?/createGroupsAction"
    class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
    use:enhance
>
    <table class="table">
        <thead class="!variant-soft-secondary">
            <tr>
                <th>Create Prompt</th>
                <th class="text-end">
                    <a
                        href={groupsRoute}
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
        <tbody class="!bg-white dark:!bg-inherit">
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Name *</td>
                <td>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="Enter name here..."
                        class="input w-full {form?.errors?.title ? 'border-error-300 text-error-500' : ''}"
                    />
                    {#if form?.errors?.title}
                        <p class="text-error-500 text-xs">{form?.errors?.title[0]}</p>
                    {/if}
                </td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td class="align-top">Description *</td>
                <td>
                    <textarea
                        name="description"
                        required
                        placeholder="Enter description here..."
                        class="input"
                    />
                </td>
            </tr>

            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Group *</td>
                <td>
                    <select
                        class="select w-full"
                        required
                        name="group"
                        placeholder="Select type here..."
                    >
                        <option>Chat Default</option>
                        <option />
                        <option />
                        <option />
                        <option />
                        <option />
                    </select>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="flex flex-wrap p-2 justify-end gap-2">
        <button
            type="submit"
            class="btn variant-filled-secondary">Save</button>
      
    </div>
</form>
