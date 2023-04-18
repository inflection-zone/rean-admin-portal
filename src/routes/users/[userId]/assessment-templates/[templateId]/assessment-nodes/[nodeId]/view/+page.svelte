<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply, faPen, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { show } from '$lib/utils/message.utils';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let id = data.assessmentNode.id;
	let nodeType = data.assessmentNode.NodeType;
	let title = data.assessmentNode.Title;
	let description = data.assessmentNode.Description ?? null;
	let message = data.assessmentNode.Message ?? null;
	let serveListNodeChildrenAtOnce = data.assessmentNode.ServeListNodeChildrenAtOnce ?? null;
	let queryType = data.assessmentNode.QueryResponseType;
	let options = data.assessmentNode.Options ?? [];
	let childrenNodes = data.assessmentNode.Children ?? [];
	let displayCode = data.assessmentNode.DisplayCode;

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});

	const userId = $page.params.userId;
	const templateId = $page.params.templateId;
	const nodeId = $page.params.nodeId;
	const editRoute = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes/${nodeId}/edit`;
	const viewRoute = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes/${nodeId}/view`;
	const assessmentNodeRoutes = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes`;
	const createNodeRoute = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes/create`;
	const editNodeRoute = (id) =>
		`/users/${userId}/assessment-templates/${templateId}/assessment-nodes/${id}/edit`;

	const breadCrumbs = [
		{
			name: 'Assessment-Nodes',
			path: assessmentNodeRoutes
		},
		{
			name: 'View',
			path: viewRoute
		}
	];

	const handleAssessmentNodeDelete = async (e, id) => {
		const assessmentNodeId = id;
		console.log('assessmentNodeId', assessmentNodeId);
		await Delete({
			sessionId: data.sessionId,
			assessmentTemplateId: templateId,
			assessmentNodeId: assessmentNodeId
		});
		window.location.href = viewRoute;
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/assessment-nodes`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: {
				'content-type': 'application/json'
			}
		});
		console.log();
	}
</script>

<main class="h-screen mb-10">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div>
		<form
			method="get"
			class="w-full lg:max-w-5xl md:max-w-xl sm:max-w-lg mb-10 bg-[#ECE4FC] mt-6 rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white lg:text-xl text-lg ">
					<div class="lg:hidden md:hidden block">View Assessment Node</div>
					<div class="lg:block md:block hidden">View Assessment Node</div>
					<a href={assessmentNodeRoutes}>
						<Fa icon={faMultiply} size="lg" class="absolute right-0 lg:pr-3 pr-0 text-white" />
					</a>
				</div>
			</div>
			<div class="hidden">{id}</div>
			<div class="flex items-center mb-4 mt-10 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Node Type</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="nodeType">{nodeType}</span>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Parent Node</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="title">{displayCode}</span>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Title</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="title">{title}</span>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Description</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="description">{description}</span>
			</div>

			{#if nodeType === 'Questin'}
				<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
					<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label class="label">
							<span>Query Response Type</span>
						</label>
					</div>
					<span class="span w-1/2 md:2/3 lg:2/3" id="queryType"> {queryType} </span>
				</div>

				<div class="flex items-start my-4 lg:mx-16 md:mx-12 mx-10">
					{#if options.length > 0}
						<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
							<!-- svelte-ignore a11y-label-has-associated-control -->
							<label class="label">
								<span>Options</span>
							</label>
						</div>
						<ol class="span w-1/2 md:w-2/3 lg:w-2/3 list-decimal ml-3" id="modules">
							{#each options as option}
								<li>{option.Text}</li>
							{/each}
						</ol>
					{/if}
				</div>
			{:else if nodeType === 'Message'}
				<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
					<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label class="label">
							<span>Message</span>
						</label>
					</div>
					<span class="span w-1/2 md:2/3 lg:2/3" id="description">{message}</span>
				</div>
			{:else if nodeType === 'Node list'}
				<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
					<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label class="label">
							<span>Serve list node children at once</span>
						</label>
					</div>
					<span class="span w-1/2 md:2/3 lg:2/3" id="serveListNodeChildrenAtOnce">
						{serveListNodeChildrenAtOnce}
					</span>
				</div>

				<div class=" lg:flex items-start my-4 lg:mx-16 md:mx-12 mx-10">
					<div class="w-1/2 lg:w-1/3 mb-2 ">
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label class="label">
							<span>Children Nodes</span>
						</label>
					</div>
					{#if childrenNodes.length <= 0}
						<span class="span">Children nodes not available!</span>
					{:else}
						<div class="span w-full lg:w-2/3 " id="modules">
							<table class="table-auto overflow-x-auto text-left ">
								<thead class="font-semibold">
									<tr class="font-semibold">
										<th style="width: 15%;">Sequence</th>
										<th style="width: 15%;">Node type</th>
										<th style="width: 60%;">Title</th>
										<th style="width: 5%;" />
										<th style="width: 5%;" />
									</tr>
								</thead>
								<tbody>
									{#each childrenNodes as node}
										<tr>
											<td style="width: 10%;">{node.Sequence}</td>
											<td style="width: 20%;">{node.NodeType}</td>
											<td style="width: 60%;">{node.Title}</td>
											<td style="width: 5%;">
												<a href={editNodeRoute(node.id)}
													><Fa icon={faPencil} style="color-text-primary" size="md" /></a
												>
											</td>
											<td style="width: 5%;">
												<Confirm
													confirmTitle="Delete"
													cancelTitle="Cancel"
													let:confirm={confirmThis}
													on:delete={(e) => {
														handleAssessmentNodeDelete(e, node.id);
													}}
												>
													<button
														on:click|preventDefault={() =>
															confirmThis(handleAssessmentNodeDelete, node.id)}
														class=""><Fa icon={faTrash} /></button
													>
													<span slot="title"> Delete </span>
													<span slot="description">
														Are you sure you want to delete a child node?
													</span>
												</Confirm>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
							<!-- <li>{node.Title}</li> -->
						</div>
					{/if}
				</div>
			{/if}
			{#if nodeType === 'Node list'}
				<div class="flex items-center mt-10 lg:mx-10 md:mx-16">
					<div class="lg:w-8/12 w-1/3 sm:w-1/2 md:w-1/2 max-[375px]:w-1/4" />
					<div class="flex lg:w-1/3 gap-2 w-2/4 max-[375px]:w-full ">
						<a href={createNodeRoute}>
							<button
								type="submit"
								class="btn variant-filled-primary lg:w-full md:w-28 sm:w-24 min-[280px]:w-24 w-20 mb-8 lg:mr-4 mr-1   "
							>
								Add child
							</button>
						</a>
						<a href={editRoute}>
							<button
								type="submit"
								class="btn variant-filled-primary lg:w-full md:w-28 sm:w-24 min-[280px]:w-24 w-20 mb-8 lg:mr-4 mr-1 "
							>
								Edit
								<Fa icon={faPen} size="lg" class="lg:ml-4 sm:ml-2 ml-1" />
							</button>
						</a>
					</div>
				</div>
			{:else}
				<div class="flex items-center mt-7 lg:mx-16 md:mx-12 mr-10">
					<div class="lg:w-5/6 w-2/3 " />
					<div class="lg:w-1/6 w-1/3 ">
						<a href={editRoute}>
							<button
								type="submit"
								class="btn variant-ringed-primary lg:w-full w-24 mb-10 lg:mr-4 mr-1"
							>
								Edit
								<Fa icon={faPen} size="lg" class="lg:ml-4 sm:ml-2 ml-1" />
							</button>
						</a>
					</div>
				</div>
			{/if}
		</form>
	</div>
</main>
