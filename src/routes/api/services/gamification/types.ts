import { get_ } from '../common';
import { AWARDS_BACKEND_API_URL } from '$env/static/private';

/////////////////////////////////////////////////////////////////////////////

export const getEventTypes = async (sessionId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/types/event-types`;
	return await get_(sessionId, url, true);
};

export const getEventActionTypes = async (sessionId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/types/event-action-types`;
	return await get_(sessionId, url, true);
};

export const getContextTypes = async (sessionId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/types/context-types`;
	return await get_(sessionId, url, true);
};

export const getConditionOperatorTypes = async (sessionId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/types/condition-operator-types`;
	return await get_(sessionId, url, true);
};

export const getLogicalOperatorTypes = async (sessionId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/types/logical-operator-types`;
	return await get_(sessionId, url, true);
};

export const getCompositeOperatorTypes = async (sessionId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/types/composite-operator-types`;
	return await get_(sessionId, url, true);
};

export const getMathematicalOperatorTypes = async (sessionId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/types/mathematical-operator-types`;
	return await get_(sessionId, url, true);
};

export const getExecutionStatusTypes = async (sessionId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/types/execution-status-types`;
	return await get_(sessionId, url, true);
};

export const getDataActionTypes = async (sessionId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/types/data-action-types`;
	return await get_(sessionId, url, true);
};

export const getOperandDataTypes = async (sessionId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/types/operand-data-types`;
	return await get_(sessionId, url, true);
};

export const getInputSourceTypes = async (sessionId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/types/input-source-types`;
	return await get_(sessionId, url, true);
};

export const getOutputSourceTypes = async (sessionId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/types/output-source-types`;
	return await get_(sessionId, url, true);
};
