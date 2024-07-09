<script lang="ts">
    import { page } from '$app/stores';
    import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
    import Icon from '@iconify/svelte';
    import type { PageServerData } from './$types';
///////////////////////////////////////////////////////////////////////////////
export let data: PageServerData;
    // Initializing data variables
    let system = data.system;
    let id = system.id;
    let name = system.Name;
    let description = system.Description !== null ? system.Description : 'Not specified';
    let fileName = system.FileName;
    let source = system.Source; 
    let parentDocument = system.ParentDocument;
    let parentDocumentVersion = system.ParentDocumentVersion !== null ? system.ParentDocumentVersion : 'Not specified';
    let chunkingStrategy = system.ChunkingStrategy; 
    let chunkingLenght = system.ChunkingLenght;
    let chunkOverlap = system.ChunkOverlap;
    let splitter = system.Splitter;
    let isActive = system.IsActive;
    let createdBy = system.CreatedBy; 
    // fileName: z.string(),
    // source: z.string().optional(),
	// parentDocument: z.string().optional(),
    // parentDocumentVersion: z.string().optional(),
    // chunkingStrategy: z.string().optional(),
    // chunkingLength: z.string().optional(),
    // chunkingOverlap: z.string().optional(),
    // splitter: z.string().optional(),
    // isActive: z.string().optional(),
    // createdBy :  z.string().optional(),
    // let id = '';
    // let name = 'Maternity-Pregnancy';
    // let displayCode = '432435';
    // let description = 'This Document contain all the information needed preganancy care and parental guidence.';
    // let type = 'CSV';
    // let version = 'V3';
    // let fileName = 'maternity-pregnancy.csv';
    // let source = 'Library';
    // let parentDocument = 'maternity_faqs.csv';
    // let active = 'Yes';
    // let keywords = 'Neo Natal, Pregnancy, Nutrition';
    // let storageKey = '';
    // let chunkingStrategy = 'Recursive Strcture Aware Splitting';
    // let chunkingLength = '400';
    // let chunkingOverlap = '60';
    // let splitter = '\n';
    // let lastUpdated = '5 days ago';

    // Extracting userId and tenantId from page params
    const userId = $page.params.userId;
    const tenantId = $page.params.id;

    // Generating routes for edit, view, and document
    const editRoute = `/users/${userId}/qna-documents/systems/${id}/edit`;
    const viewRoute = `/users/${userId}/qna-documents/systems/${id}/view`;
    const documentRoute = `/users/${userId}/qna-documents/systems`;

    // Generating breadcrumb items
    const breadCrumbs = [
        {
            name: 'Document',
            path: documentRoute
        },
        {
            name: 'View',
            path: viewRoute
        }
    ];
</script>

<!-- Rendering breadcrumbs component -->
<BreadCrumbs crumbs={breadCrumbs} />

<!-- Button for editing document -->
<div class="flex w-full flex-wrap justify-end gap-2  my-2">
    <a
        href={editRoute}
        class="btn variant-filled-secondary"
    >
        <Icon icon="material-symbols:edit-outline " />
        <span>Edit</span>
    </a>
</div>

<!-- Table for displaying document details -->
<div class="table-container my-2 border border-secondary-100 dark:border-surface-700 ">
    <table class="table">
        <thead class="!variant-soft-secondary">
            <tr>
                <th>View Document</th>
                <th class="text-end">
                    <a
                        href={documentRoute}
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
            <!-- Rows displaying document details -->
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Name</td>
                <td>{name}</td>
            </tr>
         
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Description</td>
                <td>{description}</td>
            </tr>
       
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Version</td>
                <td>{parentDocumentVersion}</td>
            </tr>
        
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>File Name</td>
                <td>{fileName}</td>
            </tr>
            <!-- Remaining rows displaying document details -->
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Source</td>
                <td>{source}</td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Parent Document</td>
                <td>{parentDocument}</td>
            </tr>
        
          
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Active</td>
                <td>{isActive}</td>
            </tr>
           
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Chunking Strategy</td>
                <td>{chunkingStrategy}</td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Chunking Length</td>
                <td>{chunkingLenght}</td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Chunking Overlap</td>
                <td>{chunkOverlap}</td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Splitter</td>
                <td>{splitter}</td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Last Updated</td>
                <td>{createdBy}</td>
            </tr>
        </tbody>
    </table>
</div>

