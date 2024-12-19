// Javascript

fetchData();

async function getData(link) {
    let data;
    await fetch(link)
        .then(response => response.json())
        .then(json => {
            data = json;
        })
        .catch(error => console.error('Error:', error));
    return data;
}

async function fetchData() {
    const users = await getData('https://jsonplaceholder.typicode.com/users');
    const posts = await getData('https://jsonplaceholder.typicode.com/posts');
    const comments = await getData('https://jsonplaceholder.typicode.com/comments');

    console.log('Users:', users);
    console.log('Posts:', posts);
    console.log('Comments:', comments);

    posts.forEach(post => {
        post.comments = comments.filter(comment => comment.postId === post.id);
    });

    users.forEach(user => {
        user.posts = posts.filter(post => post.userId === user.id);
    });

    displayData(users, 'user-list');
}

function displayData(users, elementId) {
    const container = document.getElementById(elementId);
    users.forEach(user => {
        const userBox = document.createElement('div');
        userBox.className = 'item-box';

        let userContent = `
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Address:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Company:</strong> ${user.company.name}</p>
            <p><strong>User posts:</strong></p>
        `;

        user.posts.forEach(post => {
            userContent += `
                <div class="post-box">
                    <p><strong>Post Title:</strong> ${post.title}</p>
                    <p>${post.body}<br></br></p>
                    <p><strong>  Comments:</strong><p>
                    <div class="comments">
                        ${post.comments.map(comment => `
                            <div class="comment-box">
                                <p><strong>${comment.name}</strong> </p>
                                <p>${comment.body}</p>
                                <p><strong>Email:</strong> ${comment.email}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });

        userBox.innerHTML = userContent;
        container.appendChild(userBox);
    });
}

