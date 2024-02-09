const urlFirebase =
  "https://flutter-prep-19820-default-rtdb.europe-west1.firebasedatabase.app/posts.json";

function generateId() {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}
getPosts();

const createButton = document.querySelector(".create-button");
createButton.addEventListener("click", () => {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.style.width = "300px";
  modalContent.style.height = "300px";
  modalContent.style.display = "flex";
  modalContent.style.flexDirection = "column";
  modalContent.style.justifyContent = "space-between";
  modalContent.style.alignItems = "center";
  modalContent.style.padding = "20px";
  modalContent.style.backgroundImage = "url('./assets/falcon.jpg')";
  modalContent.style.border = "1px solid black";
  modalContent.style.borderRadius = "5px";
  modalContent.style.position = "fixed";
  modalContent.style.top = "50%";
  modalContent.style.left = "50%";
  modalContent.style.transform = "translate(-50%, -50%)";

  modalContent.classList.add("modal-content");

  const titleInput = document.createElement("input");
  titleInput.placeholder = "Title";
  modalContent.appendChild(titleInput);

  const imageInput = document.createElement("input");
  imageInput.placeholder = "Image";
  modalContent.appendChild(imageInput);

  const contentInput = document.createElement("textarea");
  contentInput.placeholder = "Content";
  modalContent.appendChild(contentInput);

  const allInput = document.querySelectorAll("input");

  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  modalContent.appendChild(submitButton);

  modal.appendChild(modalContent);

  document.body.appendChild(modal);

  submitButton.addEventListener("click", () => {
    const title = titleInput.value;
    const image = imageInput.value;
    const content = contentInput.value;

    const postData = {
      id: generateId(),
      title: title,
      image: image,
      content: content,
    };

    fetch(urlFirebase, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post created:", data);
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });

    modal.remove();
  });
});

function getPosts() {
  fetch(urlFirebase)
    .then((response) => response.json())
    .then((data) => {
      for (const index in data) {
        createPost(
          data[index].id,
          data[index].title,
          data[index].image,
          data[index].content
        );
      }
      console.log(data);
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
}

function createPost(titlePost, imagePost, contentPost) {
  const container = document.querySelector(".blog-container");
  const post = document.createElement("div");

  post.id = generateId();
  post.classList.add("blog-post");

  post.style.minWidth = "300px";
  post.style.maxWidth = "400px";
  post.style.border = "1px solid white";
  post.style.padding = "10px";
  post.style.display = "flex";
  post.style.flexDirection = "column";
  post.style.alignItems = "center";

  const title = document.createElement("h2");
  title.textContent = titlePost;
  post.appendChild(title);

  const image = document.createElement("img");
  image.src = imagePost;
  post.appendChild(image);
  image.style.objectFit = "cover";

  const content = document.createElement("p");
  content.textContent = contentPost;
  post.appendChild(content);

  container.appendChild(post);

  const deleteButton = document.createElement("button");
  deleteButton.addEventListener("click", deletePost);
  deleteButton.textContent = "Delete";
  deleteButton.style.padding = "10px";
  deleteButton.style.margin = "10px";
  deleteButton.style.backgroundColor = "red";
  deleteButton.style.color = "white";
  deleteButton.style.border = "none";
  deleteButton.style.cursor = "pointer";
  post.appendChild(deleteButton);
}

function deletePost() {
  const deleteButton = document.querySelectorAll(".blog-post button");
  deleteButton.forEach((button) => {
    button.addEventListener("click", () => {
      const post = button.parentElement;
      const postId = post.id;

      fetch(
        `https://flutter-prep-19820-default-rtdb.europe-west1.firebasedatabase.app/posts/${postId}.json`,
        {
          method: "DELETE",
        }
      )
        .then((response) => response.json())
        .then(() => {
          post.remove();
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
        });
    });
  });
}
