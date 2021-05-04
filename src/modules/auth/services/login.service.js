import { loginApi } from './login.api'

export default async function loginService(data) {
    return await loginApi(data)
}
