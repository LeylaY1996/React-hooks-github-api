var url = "https://api.github.com";

export async function searchRepositories(searchRepo) {
    const response = await fetch(url+'/search/repositories?q='+searchRepo,
    {
        headers: {
            'Authorization': 'token your_token',
        }
    });
    return response.json();
}

export async function searchUsers(searchRepo) {
    const response = await fetch(url+'/search/users?q='+searchRepo,
    {
        headers: {
            'Authorization': 'token your_token',
        }
    });
    return response.json();
}

export async function repoDetail(owner,repoName) {
    const response = await fetch(url+'/repos/'+owner+'/'+repoName,
    {
        headers: {
            'Authorization': 'token your_token',
        }
    });
    return response.json();
}

export async function userDetail(username) {
    const response = await fetch(url+'/users/'+username,
    {
        headers: {
            'Authorization': 'token your_token',
        }
    });
    return response.json();
}

export async function userRepos(username) {
    const response = await fetch(url+'/users/'+username+'/repos',
    {
        headers: {
            'Authorization': 'token your_token',
        }
    });
    return response.json();
}


export async function saveBookmark(owner,repo) {
    const response = await fetch(url+'/user/starred/'+owner+'/'+repo,
    {
        method: 'PUT',
        headers: {
            'Authorization': 'token your_token',
        },
    });
    return response;
}

export async function getBookmarks() {
    const response = await fetch(url+'/user/starred',
    {
        headers: {
            'Authorization': 'token your_token',
        }
    });
    return response.json();
}