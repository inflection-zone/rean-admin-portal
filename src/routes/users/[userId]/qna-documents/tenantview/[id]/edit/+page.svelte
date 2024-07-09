<!-- Importing necessary components and utilities -->
<script lang="ts">
    import Image from '$lib/components/image.svelte';
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';
    import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
    import Icon from '@iconify/svelte';
    import { showMessage } from '$lib/utils/message.utils.js';
    import type { PageServerData } from './$types';
 

    export let form;
    export let data: PageServerData;
    let tenantview = data.tenantview;
    let id = tenantview.id;
    let name = tenantview.Name;
    let description = tenantview.Description !== null ? tenantview.Description : 'Not specified';
    let fileName = tenantview.FileName;
    let source = tenantview.Source;
    let parentDocument = tenantview.ParentDocument;
    let parentDocumentVersion = tenantview.ParentDocumentVersion !== null ? tenantview.ParentDocumentVersion : 'Not specified';
    let chunkingStrategy = tenantview.ChunkingStrategy;
    let chunkingLength = tenantview.ChunkingLength;
    let chunkOverlap = tenantview.ChunkOverlap;
    let splitter = tenantview.Splitter;
    let isActive = tenantview.IsActive;
    let createdBy = tenantview.CreatedBy;

    //Original data
    let _name = name;
    let _description = description;
    let _fileName = fileName;
    let _source = source;
    let _parentDocument = parentDocument;
    let _parentDocumentVersion = parentDocumentVersion;
    let _chunkingStrategy = tenantview.ChunkingStrategy;
    let _chunkingLength = chunkingLength;
    let _chunkOverlap = chunkOverlap;
    let _splitter = splitter;
    let _isActive = isActive;
    let _createdBy = createdBy;

    function handleReset() {
        name = _name;
        description = _description;
        fileName = _fileName;
        source = _source;
        parentDocument = _parentDocument;
        parentDocumentVersion = _parentDocumentVersion;
        chunkingStrategy = _chunkingStrategy;
        chunkingLength = _chunkingLength;
        chunkOverlap = _chunkOverlap;
        splitter = _splitter;
        isActive = _isActive;
        createdBy = _createdBy;
    }

    const userId = $page.params.userId;
    const editRoute = `/users/${userId}/qna-documents/tenantview/${id}/edit`;
    const viewRoute = `/users/${userId}/qna-documents/tenantview/${id}/view`;
    const documentRoute = `/users/${userId}/qna-documents/tenantview`;
    const breadCrumbs = [
        { name: 'Document', path: documentRoute },
        { name: 'Edit', path: editRoute }
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

<!-- Breadcrumbs for navigation -->
<BreadCrumbs crumbs={breadCrumbs} />

<!-- Form for editing document -->
<form
    method="post"
    action="?/editTenantviewAction"
    class="table-container my-2 border border-secondary-100 dark:!border-surface-700 "
    use:enhance
>
    <table class="table ">
        <thead class="!variant-soft-secondary">
            <tr>
                <th>Edit Document</th>
                <th class="text-end">
                    <a
                        href={viewRoute}
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
            <!-- Name Field -->
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Name *</td>
                <td>
                    <input
                        type="text"
                        name="name"
                        required
                        bind:value={name}
                        class="input w-full {form?.errors?.title ? 'border-error-300 text-error-500' : ''}"
                    />
                    {#if form?.errors?.title}
                        <p class="text-error-500 text-xs">{form?.errors?.title[0]}</p>
                    {/if}
                </td>
            </tr>
            <!-- Description Field -->
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td class="align-top">Description *</td>
                <td>
                    <textarea
                        name="description"
                        bind:value={description}
                        class="input"
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
                        bind:value={fileName}
                        required
                        placeholder="Enter name here..."
                        class="input w-full {form?.errors?.fileName ? 'border-error-300 text-error-500' : ''}"
                    />
                    {#if form?.errors?.fileName}
                        <p class="text-error-500 text-xs">{form?.errors?.FileName[2]}</p>
                    {/if}
                </td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Source</td>
                <td>
                    <input
                        type="text"
                        name="source"
                        required
                        bind:value={source}
                        class="input w-full {form?.errors?.source ? 'border-error-300 text-error-500' : ''}"
                    />
                    {#if form?.errors?.source}
                        <p class="text-error-500 text-xs">{form?.errors?.source[0]}</p>
                    {/if}
                </td>
            </tr>

            <!-- Parent Document -->
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Parent Document</td>
                <td>
                    <input
                        type="text"
                        bind:value={parentDocument}
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
                        bind:value={parentDocumentVersion}
                        placeholder="Select type here..."
                    >
                        <option value="V1">V1</option>
                        <option value="V3">V3</option>
                        <!-- Add other options if needed -->
                    </select>
                </td>
            </tr>
            <!-- isActive -->
            <!-- <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Active</td>
                <td>
                    <select
                        class="select w-full"
                        name="isActive"
                        placeholder="">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </td>
            </tr> -->
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Active</td>
                <td>
                    <input
                        type="radio"
                        name="isActive"
                        bind:value={isActive}
                        placeholder=""
                    />
                    <label for="isActive">True</label>

                    <input
                        type="radio"
                        name="isActive"
                        bind:value={isActive}
                        placeholder=""
                    />
                    <label for="isActive">False</label>
                </td>
            </tr>
            <!-- Chunking Strategy -->
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Chunking Strategy</td>
                <td>
                    <select
                        class="select w-full"
                        name="chunkingStrategy"
                        bind:value={chunkingStrategy}
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
                        name="chunkingLength"
                        bind:value={chunkingLength}
                        placeholder="Enter chunking length here..."
                        class="input w-2/5 text-end {form?.errors?.chunkingLength
                            ? 'border-error-300 text-error-500'
                            : ''}"
                    />
                    {#if form?.errors?.chunkingLength}
                        <p class="text-error-500 text-xs">{form?.errors?.ChunkingLength[0]}</p>
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
                        bind:value={chunkOverlap}
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
                        bind:value={splitter}
                        placeholder="Enter Splitter here..."
                        class="input w-2/5 text-end {form?.errors?.splitter ? 'border-error-300 text-error-500' : ''}"
                    />
                    {#if form?.errors?.splitter}
                        <p class="text-error-500 text-xs">{form?.errors?.splitter[0]}</p>
                    {/if}
                </td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Created By</td>
                <td>
                    <input
                        type="text"
                        name="createdBy"
                        bind:value={createdBy}
                        required
                        placeholder="Enter creted by here..."
                        class="input w-full {form?.errors?.createdBy ? 'border-error-300 text-error-500' : ''}"
                    />
                    {#if form?.errors?.createdBy}
                        <p class="text-error-500 text-xs">{form?.errors?.CreatedBy[0]}</p>
                    {/if}
                </td>
            </tr>
        </tbody>
    </table>
    <!-- Submit Button -->
    <div class="flex gap-2 p-2 justify-end">
		<button type="button" on:click={handleReset} class="btn variant-soft-secondary">Reset</button>
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
