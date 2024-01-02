// import type { RequestEvent } from "@sveltejs/kit"

export const GET = async () =>{

    try{
    //  return await fetch(`http://localhost:3005/api/v1/appointment-schedules/gmu/status-report/2023-12-23`)
      return await fetch(`http://13.233.253.88:3000/api/v1/appointment-schedules/gmu/status-report/2024-01-2`)
  }   
 catch(error)
 {
  console.log("error in connection",error.message)
 }
}

