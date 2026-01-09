function login() {
    const password = document.getElementById("password").value;
    const error = document.getElementById("error");

    if (password === "admin123") {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "home.html";
    } else {
        error.textContent = "Wrong password! Type Again";
    }
}
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}
// Protect the home page
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
}
// Create a new blog
function createBlog() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const imageInput = document.getElementById("image");
    const msg = document.getElementById("msg");

    if (!title || !content) {
        alert("Please fill in both title and content");
        return;
    }

    // Convert image to Base64 string if selected
    let imageData = "";
    if (imageInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function() {
            imageData = reader.result;
            saveBlog(title, content, imageData);
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        saveBlog(title, content, imageData);
    }

    msg.textContent = "Blog created successfully!";
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    imageInput.value = "";
}

// Save blog to localStorage
function saveBlog(title, content, image) {
    let blogs = JSON.parse(localStorage.getItem("blogs") || "[]");
    blogs.push({ title, content, image });
    localStorage.setItem("blogs", JSON.stringify(blogs));

    // Redirect to home page after a short delay
    setTimeout(() => {
        window.location.href = "home.html";
    }, 500);
}
// Display blogs on home page
function displayBlogs() {
    const blogList = document.getElementById("blog-list");
    blogList.innerHTML = ""; // Clear first

    const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");

    if (blogs.length === 0) {
        blogList.innerHTML = "<p>No blogs yet. Create your first blog!</p>";
        return;
    }

    blogs.forEach(blog => {
        const card = document.createElement("div");
        card.className = "blog-card";

        if (blog.image) {
            const img = document.createElement("img");
            img.src = blog.image;
            card.appendChild(img);
        }

        const title = document.createElement("h3");
        title.textContent = blog.title;
        card.appendChild(title);

        const content = document.createElement("p");
        content.textContent = blog.content;
        card.appendChild(content);

        blogList.appendChild(card);
    });
}

// Call displayBlogs when home.html loads
if (window.location.href.includes("home.html")) {
    displayBlogs();
}
