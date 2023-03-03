<script lang="ts">
	import { page } from '$app/stores';
	const userId = $page.error.userId;
	const message = $page.error.message;
	const code = $page.error.code;
</script>

<div class="w-full h-full  flex justify-center flex-col items-center">
	<img
		class="ct-image w-36 mt-7 mb-7"
		alt="logo"
		src="https://www.reanfoundation.org/wp-content/uploads/2021/10/REAN-Foundation-brand-Logo.png"
	/>

	{#if $page.error.code}
		<h1 class="m-10 font-extrabold text-[7rem] text-[#5832A1]">{$page.error.code}</h1>
		<h2 class="m-6 font-semibold text-[1.8rem]">{$page.error.message}</h2>
		{#if $page.error.code == 404}
			<h3 class="m-6 text-[#5832A1] font-semibold text-[1.5rem] italic">
				Woops! This page does not exist or has moved!
			</h3>
		{/if}
	{/if}
	<a
		href="/"
		class="m6 inline-block px-6 py-2.5 bg-[#5832A1] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#7165E3] hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-700 active:shadow-lg transition duration-150 ease-in-out"
	>
		Back to Home
	</a>
</div>
