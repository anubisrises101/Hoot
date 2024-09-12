import sendRequest from "./sendRequest";

const BASE_URL = '/api/hoots'

export function index () {
    return sendRequest(BASE_URL, 'GET');
}

export function show (hootId) {
    return sendRequest(`${BASE_URL}/${hootId}`, 'GET');
}

export function create (hootFormData){
    return sendRequest(`${BASE_URL}`, 'POST', hootFormData)
}
export function deleteHoot (hootId){
    return sendRequest(`${BASE_URL}/${hootId}`, 'DELETE')
}

export function updateHoot (hootId, hootFormData){        
    return sendRequest(`${BASE_URL}/${hootId}`, 'PUT', hootFormData)
}

export function createComment (hootId, commentFormData){
    return sendRequest(`${BASE_URL}/${hootId}/comments`, 'POST', commentFormData)
}
