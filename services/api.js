export default async function getJokesFromApi() {
    try {
        let response = await fetch(
            'https://geek-jokes.sameerkumar.website/api',
        );
        let responseJson = await response.json();
        console.log(responseJson);
        return responseJson;
    } catch (error) {
        console.error(error);
    }
}