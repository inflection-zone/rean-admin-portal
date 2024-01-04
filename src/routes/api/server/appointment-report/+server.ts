// import type { RequestEvent } from "@sveltejs/kit"

export const GET = async () =>{

    try{
    //  return await fetch(`http://localhost:3005/api/v1/appointments/tests/gmu/recent-status-report/recent-file`)
      return await fetch(`http://13.233.253.88:3000/api/v1/appointment-schedules/gmu/recent-status-report/recent-file`)
  }   
 catch(error)
 {
  console.log("error in connection",error.message)
 }
}

