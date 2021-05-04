import { BASE_URL } from '../../../config'

export default async function personApi(token) {
    const response = await fetch(`${BASE_URL}/person`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(token)
    })
    
    return await response.json()
}
