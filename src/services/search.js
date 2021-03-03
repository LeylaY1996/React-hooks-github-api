var url = "https://api.github.com";

export function searchRepositories(searchRepo) {
    return fetch(url+'/search/repositories?q='+searchRepo)
    .then(data => data.json())
}