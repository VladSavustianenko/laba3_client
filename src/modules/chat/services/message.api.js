import { BASE_URL } from '../../../config'

export default async function getMessageApi() {
    const response = await fetch(`${BASE_URL}/message`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    
    return await response.json()
}
