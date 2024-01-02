import type { RequestEvent } from "@sveltejs/kit"
import type { PageServerLoad } from "../../$types"
import { format, parse } from 'date-fns';
import { redirect } from "sveltekit-flash-message/server";

// let fileDate;

// export const actions = {
// 	gmuDataFileDate: async (event: RequestEvent) => {
// 		const request = event.request;
//     const formData = Object.fromEntries(await request.formData());
//     const date = formData.dateInput;
//     // console.log(date)
//     // fileDate = convertDateFormat(date)
//     console.log('@@@@@@@@@@',date)
//     throw redirect(303,
//       `/open/summary-uploads?date=2023-12-23` )
//     }
// }
// function convertDateFormat(dateString: string): string {
//   const parsedDate = parse(dateString, 'dd-MM-yyyy', new Date());
//   return format(parsedDate, 'yyyy-MM-dd');
// }

export const load:PageServerLoad = async ({fetch}) =>
{
    const res =await fetch(`/api/server/appointment-report`)
        const data = await res.json()
    console.log(data)
   return {
    AppointmentReport:data
   }
 }

