import { BASE_URL } from '../../../config'

export async function loginApi(data) {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    
    return await response.json()
}
