// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {


	namespace App {
		// interface Error {}
		interface Locals {
			sessionUser: {
					sessionId?      : string;
					userId?         : string;
					email?          : string;
					username?       : string;
					profileImageUrl?: string
					fullName?       : string;
					firstName?      : string;
					roleId?         : string;
			}
	}
		// interface PageData {}
		// interface Platform {}
	}

	

}

export {};
