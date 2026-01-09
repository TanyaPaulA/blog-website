// --------- DISPLAY BLOGS ON HOME PAGE ---------

function displayBlogs() {
    const blogList = document.getElementById("blog-list");
    if (!blogList) return;

    blogList.innerHTML = "";

    const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");

    if (blogs.length === 0) {
        blogList.innerHTML = "<p>No blogs yet. Create your first blog!</p>";
        return;
    }

    blogs.forEach(blog => {
        const card = document.createElement("div");
        card.className = "blog-card";

        // When clicked, open full blog page
        card.onclick = () => {
            localStorage.setItem("selectedBlog", JSON.stringify(blog));
            window.location.href = "blog.html";
        };

        if (blog.image) {
            const img = document.createElement("img");
            img.src = blog.image;
            card.appendChild(img);
        }

        const title = document.createElement("h3");
        title.textContent = blog.title;
        card.appendChild(title);

        const content = document.createElement("p");
        content.textContent = blog.content.substring(0,120) + "...";
        card.appendChild(content);

        blogList.appendChild(card);
    });
}

// Run only on home page
if (window.location.href.includes("home.html")) {
    displayBlogs();
}

// --------- DISPLAY SINGLE BLOG (FULL VIEW) ---------

if (window.location.href.includes("blog.html")) {
    const blog = JSON.parse(localStorage.getItem("selectedBlog"));
    const view = document.getElementById("blog-view");

    if (blog && view) {
        view.innerHTML = `
            ${blog.image ? `<img src="${blog.image}">` : ""}
            <h2>${blog.title}</h2>
            <p>${blog.content}</p>
        `;
    }
}
