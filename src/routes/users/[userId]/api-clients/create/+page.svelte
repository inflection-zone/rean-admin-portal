<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
	export let form;
	const userId = $page.params.userId;
	const createRoute = `/users/${userId}/api-clients/create`;
	const apiClientRoute = `/users/${userId}/api-clients`;

	const breadCrumbs = [
		{
			name: 'Api-Clients',
			path: apiClientRoute
		},
		{
			name: 'Create',
			path: createRoute
		}
	];
</script>

<main class="h-screen mb-10">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div class="">
		<form
			method="post"
			action="?/createApiClientAction"
			class="w-full bg-[#ECE4FC] lg:mt-10 md:mt-8 sm:mt-6 mb-10 mt-4 lg:max-w-4xl md:max-w-xl sm:max-w-lg  rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white text-xl">
					Create Api Client
					<a href={apiClientRoute}>
						<Fa
							icon={faMultiply}
							size="lg"
							class="absolute right-0 lg:pr-3 md:pr-2 pr-0 text-white"
						/>
					</a>
				</div>
			</div>
			<!-- <div class="hidden">{id}</div> -->
			<div class="flex items-center mb-4 mt-10 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Client Name *</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="clientName"
						required
						placeholder="Enter client name here..."
						class="input w-full {form
							?.errors?.clientName
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
							value={form?.data?.clientName ?? ""}
					/>
					{#if form?.errors?.clientName}
					<p class="text-error-500 text-xs">{form?.errors?.clientName[0]}</p>
				  {/if}
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Password *</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="password"
						required
						name="password"
						placeholder="Enter password here..."
						class="input w-full {form
							?.errors?.password
							? 'border-error-300'
							: 'border-primary-200'}"
						value={form?.data?.password ?? ""}
					/>
					 {#if form?.errors?.password}
              <p class="text-error-500 text-xs">{form?.errors?.password[0]}</p>
            {/if}
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Contact Number *</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="number"
						required
						name="phone"
						placeholder="Enter phone here..."
						value={form?.data?.phone ?? ""}
						class="input w-full {form
							?.errors?.phone
							? 'border-error-300'
							: 'border-primary-200'}"
					/>
					{#if form?.errors?.phone}
					<p class="text-error-500 text-xs">{form?.errors?.phone[0]}</p>
				 {/if}
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Email *</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="email"
						required
						placeholder="Enter email here..."
						class="input w-full {form
							?.errors?.email
							? 'border-error-300'
							: 'border-primary-200'}"
						value={form?.data?.email ?? ""}
					/>
					{#if form?.errors?.email}
					<p class="text-error-500 text-xs">{form?.errors?.email[0]}</p>
				{/if}
				</div>
			</div>

			<div class="flex items-center mt-7 lg:mx-16 md:mx-12 mr-10">
				<div class="w-3/4" />
				<div class="w-1/4 ">
					<button type="submit" class="btn variant-filled-primary w-full mb-10 ">Submit</button>
				</div>
			</div>
		</form>
	</div>
</main>
