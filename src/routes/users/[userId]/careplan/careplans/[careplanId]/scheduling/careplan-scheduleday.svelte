<script lang="ts">
	import CollapsibleSection from './collapsibleSection.svelte';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import { createEventDispatcher } from 'svelte';
	import Icon from '$lib/components/icon.svelte';

	/////////////////////////////////////////////////////////////////////

	export let userId = undefined;
	export let careplanId = undefined;
	export let classifiedByDay = [];

	classifiedByDay = classifiedByDay.map((item, index) => ({ ...item, index: index + 1 }));

	const dispatch = createEventDispatcher();

	const handlelDeleteClick = (id) => {
		dispatch('deleteActivity', {
			careplanActivityId: id
		});
	};
</script>

<section class="bg-white dark:bg-inherit overflow-auto">
	{#each classifiedByDay as day, i}
		<CollapsibleSection headerText={`Day ${day.Day}`}>
			<div class="table-container border !border-secondary-100 dark:!border-surface-700">
				<table class="table table-compact">
					<thead class="!variant-soft-secondary">
						<tr>
							<th>Id</th>
							<th>AssetType</th>
							<th>Code</th>
							<th>Time Slot</th>
							<th />
							<th />
						</tr>
					</thead>
					<tbody class="!bg-white dark:!bg-inherit">
						{#each day.Activities as activity, i}
							<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
								<td role="gridcell" aria-colindex={1} tabindex="0">
									{i + 1}
								</td>
								<td>
									{activity.AssetType}
								</td>
								<td>{activity.Code}</td>
								<td>{activity.TimeSlot}</td>
								<td>
									<a
										href={`/users/${userId}/careplan/careplans/${careplanId}/scheduling/${activity.id}/edit`}
										class="btn p-1 -my-1 hover:variant-soft-primary"
									>
									
									<Icon
										cls="stroke-slate-800 hover:stroke-primary-500 stroke-2 fill-none"
										h="100%" w="100%" iconPath='/images/others/edit.svg#icon'/>
									</a>
								</td>
								<td>
									<Confirm
										confirmTitle="Delete"
										cancelTitle="Cancel"
										let:confirm={confirmThis}
										on:delete={() => handlelDeleteClick(activity.id)}
									>
										<button
											on:click|preventDefault={() => confirmThis(handlelDeleteClick, activity.id)}
											class="btn px-0 -my-2 hover:variant-soft-error"
									>
									<Icon
										cls="stroke-slate-800 hover:stroke-slate-500 stroke-2 fill-none"
										h="100%" w="100%" iconPath='/images/others/delete.svg#icon'/>
										</button>
										<span slot="title"> Delete </span>
										<span slot="description"> Are you sure you want to delete a content? </span>
									</Confirm>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</CollapsibleSection>
	{/each}
</section>
