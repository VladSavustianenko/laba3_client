import { signupApi } from './signup.api'

export default async function signupService(data) {
    return await signupApi(data)
}
