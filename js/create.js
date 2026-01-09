function createBlog() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const imageInput = document.getElementById("image");
    const msg = document.getElementById("msg");

    if (!title || !content) {
        alert("Please fill in both title and content");
        return;
    }

    let imageData = "";

    if (imageInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function () {
            imageData = reader.result;
            saveBlog(title, content, imageData);
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        saveBlog(title, content, imageData);
    }

    msg.textContent = "Blog created successfully!";
}

function saveBlog(title, content, image) {
    let blogs = JSON.parse(localStorage.getItem("blogs") || "[]");
    blogs.push({ title, content, image });
    localStorage.setItem("blogs", JSON.stringify(blogs));

    setTimeout(() => {
        window.location.href = "home.html";
    }, 500);
}
