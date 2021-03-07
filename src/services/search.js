var url = "https://api.github.com";

var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");

export async function searchRepositories(searchRepo) {
    const response = await fetch(url+'/search/repositories?q='+searchRepo,{
        myHeaders
    });
    return response.json();
}

export async function searchUsers(searchRepo) {
    const response = await fetch(url+'/search/users?q='+searchRepo,{
        myHeaders
    });
    return response.json();
}

export async function repoDetail(owner,repoName) {
    const response = await fetch(url+'/repos/'+owner+'/'+repoName,{
        myHeaders
    });
    return response.json();
}

export async function userDetail(username) {
    const response = await fetch(url+'/users/'+username,{
        myHeaders
    });
    return response.json();
}

/* export async function userRepos(username) {
    const response = await fetch(url+'/orgs/'+username+'/repos/',{
        myHeaders
    });
    return response.json();
}
 */