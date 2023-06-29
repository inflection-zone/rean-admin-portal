import { CAREPLAN_BACKEND_API_URL } from "$env/static/private";
import { get_ } from "../common";

////////////////////////////////////////////////////////////////

export const searchParticipantActivities = async (sessionId: string, participantId: string) => {
    const url = CAREPLAN_BACKEND_API_URL + `/participant-activity-responses/search?participantId=${participantId}`;
     console.log("URL----",url);
    return await get_(sessionId, url,false);
};


