<script lang="ts" >
	import Fa from 'svelte-fa';
	import { faMultiply, faPen } from '@fortawesome/free-solid-svg-icons';
	import type { PageServerData } from './$types';
   import Navbar from "../../../../lib/components/nav/nav.svelte"
	
</script>
<Navbar />
<div class=" breadcrumbs text-xl  text-[#7165E3] ml-14 mt-5">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/">Assessment-template</a></li>
    <li>View</li>
  </ul>
</div>

<form method="get" class="w-full max-w-4xl  bg-[#ECE4FC] mt-6  mb-20 rounded-lg mx-auto">
  <div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
    <div class="ml-3 relative flex flex-row text-white text-xl">
      Assessment-Template
      <Fa icon={faMultiply} size="lg" class="absolute right-0 pr-3" />
    </div>
    </div>

	
	<div class="flex items-center my-6 mx-16">
		<div class="w-1/2">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="lable-text"> Title </label>
		</div>
		<div class="w-2/3" name="name">Cholestrol Demographics Assessment template</div>
	</div>

	
    <div class="flex items-center my-6 mx-16">
		<div class="w-1/2">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="lable-text"> Description </label>
		</div>
		<div class="w-2/3" name="description">
			Taking location date of the patient
		</div>
	</div>

	<div class="flex items-center my-6 mx-16">
		<div class="w-1/2">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="lable-text" for=""> Display code </label>
		</div>
		<div class="w-2/3">
			Assessment template Cholestrol demo
		</div>
	</div>
    

	<div class="flex items-center my-6 mx-16">
		<div class="w-1/2">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="lable-text"> Type </label>
		</div>
		 <div class="w-2/3 " name="version">Careplan</div>
	</div>
    <div class="flex items-center my-6 mx-16">
		<div class="w-1/2">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="lable-text"> Provider </label>
		</div>
		 <div class="w-2/3 " name="version">Rean</div>
	</div>
    <div class="flex items-center my-6 mx-16">
		<div class="w-1/2">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="lable-text"> Provider assessment code </label>
		</div>
		 <div class="w-2/3 " name="version">1</div>
	</div>
    <div class="flex items-center my-6 mx-16">
		<div class="w-1/2">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="lable-text"> Serve list node childrenAt once  </label>
		</div>
		 <div class="w-2/3 " name="version">False</div>
	</div>

	<div class="flex items-center mt-10 mx-16">
		<div class="w-5/6" />
		<div class="w-1/6 ">
			<a href="/assets/action-plan/[id]/edit">
				<button class="btn  btn-outline w-full mb-10 mr-4"
					>Edit
					<Fa icon={faPen} size="lg" class="ml-5" />
				</button>
			</a>
		</div>
	</div>
</form>
