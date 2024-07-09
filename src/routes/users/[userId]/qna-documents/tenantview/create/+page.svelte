<script lang="ts">
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';
    import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
    import Icon from '@iconify/svelte';
    import InputChip from '$lib/components/input-chips.svelte';
    import { showMessage } from '$lib/utils/message.utils.js';

    ///////////////////////////////////////////////////////////////////////////////////////////////////////

    // Initializing variables and constants
    export let form;
    const userId = $page.params.userId;
    const createRoute = `/users/${userId}/qna-documents/tenantview/create`;
    const tenantviewRoute = `/users/${userId}/qna-documents/tenantview`;
    const breadCrumbs = [
        { name: 'Document', path: tenantviewRoute },
        { name: 'Create', path: createRoute }
    ];

    let imageUrl = '';
    let fileinput;

   

    // Function to upload file asynchronously
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

    // Function triggered when file is selected
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

<!-- Breadcrumbs Component -->
<BreadCrumbs crumbs={breadCrumbs} />

<!-- Document Creation Form -->
<form
    method="post"
    action="?/createTenantviewAction"
    class="table-container my-2 border border-secondary-100 dark:!border-surface-700 "
    use:enhance>
    <!-- Table Head -->
    <table class="table ">
        <thead class="!variant-soft-secondary">
            <tr>
                <th>Create Document</th>
                <th class="text-end">
                    <!-- Close Button -->
                    <a
                        href={tenantviewRoute}
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
        <!-- Table Body -->
        <tbody class="!bg-white dark:!bg-inherit">
            <!-- Name -->
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Name *</td>
                <td>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="Enter name here..."
                        class="input w-full {form?.errors?.name ? 'border-error-300 text-error-500' : ''}"
                    />
                    {#if form?.errors?.name}
                        <p class="text-error-500 text-xs">{form?.errors?.Name[0]}</p>
                    {/if}
                </td>
            </tr>

            <!-- Description -->
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td class="align-top">Description *</td>
                <td>
                    <textarea
                        name="description"
                        placeholder="Enter description here..."
                        class="input"
                        required
                    />
                </td>
            </tr>

             <!-- Name -->
             <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>File Name </td>
                <td>
                    <input
                        type="text"
                        name="fileName"
                        required
                        placeholder="Enter name here..."
                        class="input w-full {form?.errors?.fileName ? 'border-error-300 text-error-500' : ''}"
                    />
                    {#if form?.errors?.fileName}
                        <p class="text-error-500 text-xs">{form?.errors?.FileName[2]}</p>
                    {/if}
                </td>
            </tr>

            <!-- Source -->
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Source</td>
                <td>
                    <input
                        type="text"
                        name="source"
                        placeholder="Enter source here..."
                        class="input w-full "
                    />
                </td>
            </tr>
            <!-- Parent Document -->
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Parent Document</td>
                <td>
                    <input
                        type="text"
                        name="parentDocument"
                        required
                        placeholder="Enter name here..."
                        class="input w-full {form?.errors?.parentDocument ? 'border-error-300 text-error-500' : ''}"
                    />
                    {#if form?.errors?.parentDocument}
                        <p class="text-error-500 text-xs">{form?.errors?.ParentDocument[2]}</p>
                    {/if}
                </td>
            </tr>
            <!-- parent document Version -->
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Version</td>
                <td>
                    <select
                        class="select w-full"
                        name="parentDocumentVersion"
                        placeholder="Select type here..."
                    >
                        <option value="V1">V1</option>
                        <option value="V3">V3</option>
                        <!-- Add other options if needed -->
                    </select>
                </td>
            </tr>
             
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Active</td>
                <td>
                    <input
                        type="radio"
                        name="isActive"
                        value="true"
                        placeholder="">
                    <label for="isActive">True</label>
                    
                    <input
                        type="radio"
                        name="isActive"
                        value="false"
                        placeholder="">
                    <label for="isActive">False</label>
                </td>
            </tr>
            
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Created By</td>
                <td>
                    <input
                        type="text"
                        name="createdBy"
                        required
                        placeholder="Enter creted by here..."
                        class="input w-full {form?.errors?.createdBy ? 'border-error-300 text-error-500' : ''}"
                    />
                    {#if form?.errors?.createdBy}
                        <p class="text-error-500 text-xs">{form?.errors?.CreatedBy[0]}</p>
                    {/if}
                </td>
            </tr>
            <!-- Chunking Strategy -->
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Chunking Strategy</td>
                <td>
                    <select
                        class="select w-full"
                        name="chunkingStrategy"
                        placeholder="Select type here..."
                    >
   
                        <option>Recursive Structure Aaware Splitting</option>
                        <option>Structure Aware Splitting</option>
                        <option>Content Aware Splitting</option>
                        <option>NPL chunking</option>
                    
                    </select>
                </td>
            </tr>
            <!-- Chunking Length -->
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700 text-end">
                <td class="text-start">Chunking length</td>
                <td>
                    <input
                        type="text"
                        name="chunkingLenght"
                        placeholder="Enter chunking length here..."
                        class="input w-2/5 text-end {form?.errors?.chunkingLenght
                            ? 'border-error-300 text-error-500'
                            : ''}"
                    />
                    {#if form?.errors?.chunkingLenght}
                        <p class="text-error-500 text-xs">{form?.errors?.ChunkingLenght[0]}</p>
                    {/if}
                </td>
            </tr>
            <!-- Chunking Overlap -->
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700 text-end">
                <td class="text-start">Chunking Overlap</td>
                <td>
                    <input
                        type="text"
                        name="chunkOverlap"
                        placeholder="Enter chunking overlap here..."
                        class="input w-2/5 text-end {form?.errors?.chunkOverlap
                            ? 'border-error-300 text-error-500'
                            : ''}"
                    />
                    {#if form?.errors?.chunkOverlap}
                        <p class="text-error-500 text-xs">{form?.errors?.ChunkOverlap[0]}</p>
                    {/if}
                </td>
            </tr>
            <!-- Splitter -->
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700  text-end">
                <td class="text-start">Splitter</td>
                <td>
                    <input
                        type="text"
                        name="splitter"
                        placeholder="Enter Splitter here..."
                        class="input w-2/5 text-end {form?.errors?.splitter ? 'border-error-300 text-error-500' : ''}"
                    />
                    {#if form?.errors?.splitter}
                        <p class="text-error-500 text-xs">{form?.errors?.splitter[0]}</p>
                    {/if}
                </td>
            </tr>
         
        </tbody>
    </table>

    <!-- Submit Button -->
    <div class="flex flex-wrap p-2 justify-end gap-2">
        <button
            type="submit"
            class="btn variant-filled-secondary">Submit</button
        >
    </div>
</form>
