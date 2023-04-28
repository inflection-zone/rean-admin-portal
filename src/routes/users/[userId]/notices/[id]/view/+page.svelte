<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply, faPen } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { show } from '$lib/utils/message.utils';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import date from 'date-and-time';
	import { page } from '$app/stores';
	import Image from '$lib/components/image.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	let id = data.notice.id;
	let title = data.notice.Title;
	let description = data.notice.Description;
	let link = data.notice.Link;
	let postDate = new Date(data.notice.PostDate);
	let daysActive = data.notice.DaysActive;
	let tags_ = data.notice.Tags;
	let tags = tags_.join(', ');
	let action = data.notice.Action;
	let imageUrl = data.notice.ImageUrl;

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/notices/${id}/edit`;
	const viewRoute = `/users/${userId}/notices/${id}/view`;
	const noticeRoute = `/users/${userId}/notices`;

	const breadCrumbs = [
		{
			name: 'Notices',
			path: noticeRoute
		},
		{
			name: 'View',
			path: viewRoute
		}
	];
</script>

<main class="h-screen mb-10">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div class="">
		<form
			method="get"
			class="w-full  bg-[#ECE4FC] lg:mt-10 md:mt-8 sm:mt-6 mb-10 mt-4 lg:max-w-4xl md:max-w-xl sm:max-w-lg  rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white lg:text-xl text-lg ">
					<div class="lg:hidden md:hidden block">View Notice</div>
					<div class="lg:block md:block hidden">View Notice</div>
					<a href={noticeRoute}>
						<Fa icon={faMultiply} size="lg" class="absolute right-0 lg:pr-3 pr-0 text-white" />
					</a>
				</div>
			</div>
			<div class="hidden">{id}</div>
			<div class="flex items-center mb-4 mt-10 lg:mx-16 md:mx-12 mx-10">
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
				<span class="span w-1/2 md:2/3 lg:2/3" id="description"> {description} </span>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Link</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="link">{link}</span>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Post Date</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="postDate"
					>{date.format(postDate, 'DD MMM YYYY')}</span
				>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Days Active</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="daysActive"> {daysActive} </span>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Tags</span>
					</label>
				</div>
				{#if tags.length <= 0}
					<span class="span">Tags not specified</span>
				{:else}
					<span class="span w-1/2 md:2/3 lg:2/3">{tags} </span>
				{/if}
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Action</span>
					</label>
				</div>
				<span class="span w-1/2 md:w-2/3 lg:w-2/3" id="action">{action} </span>
			</div>

			<div class="flex items-start my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Image</span>
					</label>
				</div>
				{#if imageUrl === 'undefined'}
					<span class="span">Image not specified</span>
				{:else}
					<Image cls="flex h-24 w-24 rounded-lg" source={imageUrl} w="24" h="24" />
				{/if}
			</div>

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
		</form>
	</div>
</main>
