// import * as cookie from 'cookie';
// import type { PageServerLoad, Action } from './$types';
// import { error, redirect, type RequestEvent } from '@sveltejs/kit';
// import { getNotificationById } from '../../../../../api/services/notifications';

// ////////////////////////////////////////////////////////////////////////////

// export const load: PageServerLoad = async (event: RequestEvent) => {
// 	const sessionId = event.cookies.get('sessionId');
// 	console.log('sessionId', sessionId);

// 	try {
// 		const notificationId = event.params.id;
// 		console.log('notid=====', notificationId);
// 		const response = await getNotificationById(sessionId, notificationId);
// 		console.log('res===', response);

// 		if (response.Status === 'failure' || response.HttpCode !== 200) {
// 			throw error(response.HttpCode, response.Message);
// 		}
// 		const notification = response.Data.Notification;
// 		console.log('notification====', notification);
// 		//const id = response.Data.id;
// 		const id = response.Data.Notification.id;
// 		//console.log('id>>', response);
// 		console.log('res<====', response);
// 		return {
// 			location: `${id}/edit`,
// 			notification,
// 			message: response.Message
// 		};
// 	} catch (error) {
// 		console.error(`Error retriving notification: ${error.message}`);
// 	}
// };
