import personApi from './person.api'

export default async function personService(token) {
    return await personApi(token)
}
