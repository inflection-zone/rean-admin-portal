<!-- Documents - SystemView  -->
<script lang="ts">
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';
    import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
    import Icon from '@iconify/svelte';
    import InputChip from '$lib/components/input-chips.svelte';
    import { ProgressBar } from '@skeletonlabs/skeleton';
    import { showMessage } from '$lib/utils/message.utils.js';
    ////////////////////////////////////////////////////////////////////////////////
    export let form;
    const userId = $page.params.userId;
    const createRoute = `/users/${userId}/assessment-templates/create`;
    const assessmentsRoutes = `/users/${userId}/assessment-templates`;
    const breadCrumbs = [
        { name: 'Prompts', path: assessmentsRoutes },
        { name: 'Create', path: createRoute }
    ];
    let imageUrl = '';
    let fileinput;
    const upload = async (imgBase64, filename) => {
        const data = {};
        console.log(imgBase64);
        const imgData = imgBase64.split(',');
        data['image'] = imgData[1];
        console.log(JSON.stringify(data));
        const res = await fetch(`/api/server/file-resources/upload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                filename: filename
            },
            body: JSON.stringify(data)
        });
        console.log(Date.now().toString());
        const response = await res.json();
        if (response.Status === 'success' && response.HttpCode === 201) {
            const imageResourceId = response.Data.FileResources[0].id;
            console.log('imageResourceId', imageResourceId);
            const imageUrl_ = response.Data.FileResources[0].Url;
            console.log('imageUrl_', imageUrl_);
            if (imageUrl_) {
                imageUrl = imageUrl_;
            }
            console.log(imageUrl);
        } else {
            showMessage(response.Message, 'error');
        }
    };
    const onFileSelected = async (e) => {
        let f = e.target.files[0];
        const filename = f.name;
        let reader = new FileReader();
        reader.readAsDataURL(f);
        reader.onload = async (e) => {
            fileinput = e.target.result;
            await upload(e.target.result, filename);
        };
    };
</script>

<!-- <BreadCrumbs crumbs={breadCrumbs} /> -->

<form
    method="post"
    action="?/createNotificationAction"
    class="table-container my-2 border border-secondary-100 dark:!border-surface-700 "
    use:enhance
>
    <table class="table ">
        <thead class="!variant-soft-secondary">
            <tr>
                <th>Add New / Update Document - System User View</th>
                <th class="text-end">
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
        <tbody class="!bg-white dark:!bg-inherit">
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Name *</td>
                <td>
                    <input
                        type="text"
                        name="title"
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
                        placeholder="Enter description here..."
                        class="input"
                    />
                </td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Upload File</td>
                <td>
                    <!-- <div class="flex  ">
                        <p class="btn  variant-filled-secondary mb-3 px-2 py-1">Select File</p>
                        <p class="text-sm ml-4 mt-1 ">OR  </p>
                        <p class="text-sm ml-4 mt-1 ">Drag and Drop file below </p>
                    </div> -->
                    <input
                        name="fileinput"
                        type="file"
                        class="true input w-full"
                        placeholder="Image"
                        on:change={async (e) => await onFileSelected(e)}
                    />
                    <input
                        type="hidden"
                        name="imageUrl"
                        value={imageUrl}
                    />
                </td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td class="align-top">Keywords</td>

                <td>
                    <!-- <div class="flex  ">
                        <p class="btn  variant-filled-secondary mb-3 px-2 py-1">Identify Keywords</p>
                        <p class="text-sm ml-4 mt-1 ">OR </p>
                        <p class="text-sm ml-4 mt-1 ">Add Keywords manually below</p>
                    </div> -->
                    <InputChip
                        chips="variant-filled-error rounded-2xl"
                        name="tags"
                    />
                </td>
            </tr>

           

            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Chunking Strategy</td>
                <td>
                    <select
                        class="select w-full"
                        name="type"
                        placeholder="Select type here..."
                    >
                        <option>Recursive Structure Aware Splitting</option>
                        <option>Structure Aware Splitting ( Paragraphs,Sentensces etc. )</option>
                        <option>Content - Aware Splitting ( Markdown, LaTeX, HTML )</option>
                        <option>NLP Chunking : Trakking Topic Changes</option>
                        <option>Fixed size</option>
                    </select>
                </td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700 text-end">
                <td class=" text-start">Chunking length</td>
                <td>
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder="400"
                        class="input w-2/5 text-end {form?.errors?.title ? 'border-error-300 text-error-500' : ''}"
                    />
                    {#if form?.errors?.title}
                        <p class="text-error-500 text-xs">{form?.errors?.title[0]}</p>
                    {/if}
                </td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700 text-end">
                <td class=" text-start">Chunking Overlap</td>
                <td>
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder="60"
                        class="input w-2/5 text-end {form?.errors?.title ? 'border-error-300 text-error-500' : ''}"
                    />
                    {#if form?.errors?.title}
                        <p class="text-error-500 text-xs">{form?.errors?.title[0]}</p>
                    {/if}
                </td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700  text-end">
                <td class="text-start">Splitter</td>
                <td>
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder="\n"
                        class="input w-2/5 text-end {form?.errors?.title ? 'border-error-300 text-error-500' : ''}"
                    />
                    {#if form?.errors?.title}
                        <p class="text-error-500 text-xs">{form?.errors?.title[0]}</p>
                    {/if}
                </td>
            </tr>
        </tbody>
    </table>
    <div class="flex flex-wrap p-2 justify-end gap-2">
        <button
            type="submit"
            class="btn variant-filled-secondary">Submit</button
        >
    </div>
</form>
