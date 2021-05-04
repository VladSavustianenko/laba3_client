import getMessageApi from './message.api'

export default async function getMessageQuery() {
    return await getMessageApi()
}
