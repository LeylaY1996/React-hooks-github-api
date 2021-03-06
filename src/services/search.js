var url = "https://api.github.com";

export async function searchRepositories(searchRepo) {
    const response = await fetch(url+'/search/repositories?q='+searchRepo);
    return response.json();
}

export async function searchUsers(searchRepo) {
    const response = await fetch(url+'/search/users?q='+searchRepo);
    return response.json();
}

export async function repoDetail(owner,repoName) {
    const response = await fetch(url+'/repos/'+owner+'/'+repoName);
    return response.json();
}