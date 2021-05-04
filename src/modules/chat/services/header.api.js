import { BASE_URL } from '../../../config'

export default async function logoutApi(token) {
    const response = await fetch(`${BASE_URL}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(token),
    })
    
    return response
}

export async function editProfilePictureApi(id, picture) {
    const response = await fetch(`${BASE_URL}/edit/id:${id}`, {
        method: 'POST',
        body: picture,
    })
    
    return response
}

export async function editProfileApi(data) {
    const response = await fetch(`${BASE_URL}/edit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    
    return response
}