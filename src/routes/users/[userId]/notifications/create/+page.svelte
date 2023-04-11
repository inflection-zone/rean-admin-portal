<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import { FileButton } from '@skeletonlabs/skeleton';
	import { showMessage } from '$lib/utils/message.utils';

	const userId = $page.params.userId;
	let imageUrl = undefined;
	let fileinput;

	const createRoute = `/users/${userId}/notifications/create`;
	const notificationRoute = `/users/${userId}/notifications`;

	const breadCrumbs = [
		{
			name: 'Notifications',
			path: notificationRoute,
			home: true
		},
		{
			name: 'Create',
			path: createRoute
		}
	];

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

<main class="h-screen mb-10">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div class="px-5 mb-5 ">
		<form
			method="post"
			action="?/createNotificationAction"
			class="w-full  bg-[#ECE4FC] lg:mt-16 md:mt-8 sm:mt-6 mb-10 mt-4 lg:max-w-4xl md:max-w-xl sm:max-w-lg  rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white text-xl">
					Create Notification
					<a href={notificationRoute}>
						<Fa
							icon={faMultiply}
							size="lg"
							class="absolute right-0 lg:pr-3 md:pr-2 pr-0 text-white"
						/>
					</a>
				</div>
			</div>

			<div class="flex items-center mb-4 mt-10 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Title</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input type="text" name="title" placeholder="Enter title here..." class="input" />
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Body</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input type="text" name="Body" placeholder="Enter body here..." class="input w-full " />
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Type</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<select class="select w-full" name="type" placeholder="Select type here...">
						<option>General</option>
						<option>Auto</option>
						<option>Dark mode</option>
						<option>Light mode</option>
					</select>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Broadcast To All</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<label class="label cursor-pointer">
						<input
							type="checkbox"
							name="broadcastToAll"
							value="true"
							class="checkbox checkbox-primary checkbox-md"
						/>
					</label>
				</div>
			</div>

			<div class="flex items-center my-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Image</span>
					</label>
				</div>
				<div class="flex flex-row gap-8 w-1/2 md:w-2/3 lg:w-2/3 ">
					<input
						accept="image/png, image/jpeg"
						type="file"
						id="fileUpload"
						class="input"
						name="fileinput"
						placeholder="Image"
						on:change={async (e) => await onFileSelected(e)}
					/>
					<!-- <button 
						class="capitalize btn variant-filled-primary lg:w-[19%] md:w-[22%] md:text-[13px] sm:w-[30%] sm:text-[12px] min-[320px]:w-[40%] min-[320px]:text-[10px]"
						>Upload</button
					> -->
					<input type="hidden" name="imageUrl" value={imageUrl} />
				</div>
			</div>

			<div class="flex items-center mt-7 lg:mx-16 md:mx-12 mr-10">
				<div class="w-3/4" />
				<div class="w-1/4 ">
					<button type="submit" class="btn variant-filled-primary w-full mb-10 "> Submit </button>
				</div>
			</div>
		</form>
	</div>
</main>
