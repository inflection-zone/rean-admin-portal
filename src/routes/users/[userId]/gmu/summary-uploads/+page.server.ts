import type { PageServerLoad } from "../../$types";

export const load:PageServerLoad = async ({fetch}) =>
{
    const res =await fetch(`/api/server/gmu/appointment-report`)
    const data = await res.json()
    console.log(data)
   return {
    AppointmentReport:data
   }
 }

