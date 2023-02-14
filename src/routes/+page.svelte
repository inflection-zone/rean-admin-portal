<script lang="ts">
	import type { PageServerData } from './$types';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import { browser } from '$app/environment';
	import { personRolesStore, genderTypesStore } from '$lib/store/general.store';
	export let data: PageServerData;
	personRolesStore.set(data.roles);
	// genderTypesStore.set(data.genderTypes);
	LocalStorageUtils.setItem('personRoles', JSON.stringify(data.roles));
	// LocalStorageUtils.setItem('genderTypes', JSON.stringify(data.genderTypes));
	let personRoles = [],
		loginRoleId = 1;

	if (browser) {
		const tmp = LocalStorageUtils.getItem('personRoles');
		personRoles = JSON.parse(tmp);
		const adminRole = personRoles?.find((x) => x.RoleName === 'System admin');
		if (adminRole) {
			loginRoleId = adminRole.id;
		}
		LocalStorageUtils.removeItem('prevUrl');
	}
</script>

<svelte:head>
	<title>REAN careplans</title>
	<meta name="description" content="REAN careplans" />
</svelte:head>

<div class="nav h-12 w-screen shadow-xl bg-secondary" />
<div class="w-screen h-full overflow-x-auto self-center box-border" id="background-image">
	<div class="bg-back-ground h-screen ">
		<!-- <div class="h-10 w-screen shadow-xl mb-4 bg-[#7165E3]" /> -->
		<div class="h-full w-full px-3">
			<div class=" flex justify-center flex-col items-center">
				<img
					class="ct-image w-36 mt-7 mb-7"
					alt="logo"
					src="https://www.reanfoundation.org/wp-content/uploads/2021/10/REAN-Foundation-brand-Logo.png"
				/>
				<form
					method="post"
					action="?/login"
					class=" shadow-bottom-right p-8 pb-1 pt-5 rounded-lg mt-5 tertiary"
				>
					<!-- <input class="hidden" type="number" name="loginRoleId" value={loginRoleId}> -->
					<div class="hidden">
						<input name="loginRoleId" class="hidden" value={loginRoleId} />
					</div>
					<div class="form-control justify-center w-full mt-5 h-50">
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label class="label" for="username">
							<span class="label-text text-primary">Username / Email</span>
							<span class="label-text-alt" />
						</label>
						<input
							type="text"
							name="username"
							required
							class="input input-bordered input-primary rounded-lg mb-3 h-10"
						/>
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label class="label" for="password">
							<span class="label-text text-primary">Password / OTP</span>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<span on:click class="label-text text-primary"><b>Generate OTP</b></span>
						</label>
						<input
							type="password"
							name="password"
							required
							class="input input-bordered input-primary rounded-lg h-10"
						/>
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label class="label">
							<span class="label-text text-primary"><b>Forgot Password?</b></span>
						</label><br />
						<button
							type="submit"
							class=" w-40 ml-20 lg:ml-52 md:ml-52 sm:ml-52  h-10 mb-8  font-semibold tracking-wide rounded-lg bg-primary button-text-color"
						>
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
