async function handleSearch() {
    const user = document.getElementById('username').value.trim();
    const output = document.getElementById('output');

    if (!user) {
        output.innerHTML = `<p style="color:red;">Please enter a GitHub username.</p>`;
        return;
    }

    const url = `https://github-profiles-trending-developers-repositories-scrapping.p.rapidapi.com/profiles?profileUrl=https://github.com/${user}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '346d57df26mshe38743c4c9794f5p1fa1a2jsn1aa10150e71c',
            'x-rapidapi-host': 'github-profiles-trending-developers-repositories-scrapping.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        console.log(data);
        const profile = Array.isArray(data) ? data[0] : data;

        if (profile && profile.profileName && profile.avatar) {
            output.innerHTML = `
                <img src="${profile.avatar}" alt="Avatar" style="border: 2px solid black; border-radius: 50%; width: 120px;">
                <h2>${profile.profileName}</h2>
                <p><strong>Commits:</strong> ${profile.totalCommits || 'Not available'}</p>
            `;
        } else {
            output.innerHTML = `<p style="color:red;">Profile not found or incomplete data.</p>`;
        }
    } catch (error) {
        output.innerHTML = `<p style="color:red;">Error fetching data: ${error.message}</p>`;
        console.error(error);
    }
}