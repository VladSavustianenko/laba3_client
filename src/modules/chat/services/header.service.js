import logoutApi from './header.api'
import { editProfileApi, editProfilePictureApi } from './header.api'

export default async function logoutService(token) {
    logoutApi(token)
}

export async function editProfilePictureService(id, picture) {
    editProfilePictureApi(id, picture)
}

export async function editProfileService(data) {
    editProfileApi(data)
}
