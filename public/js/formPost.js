const modalForm = document.getElementById("modalForm");
const cancelBttn = document.getElementById("cancelBttn");

const formPost = document.querySelector('#new-post-form')
const bttnAddPost = document.getElementById("addPost");

const newCommentForms = document.querySelectorAll('#new-comment-form')
  

var showModal = (modalForm.dataset.activeForm = "none") ? false : true;

const toggleDisplay = () => {
  var display = (showModal) ? "flex" : "none" ;
  modalForm.style.display = display
}

const postToggle = () => {
  showModal = !showModal;
  if (showModal) {
    bttnAddPost.style.display = "none";
  } else {
    bttnAddPost.style.display = "initial";
  }
  toggleDisplay();
}


//#region Form Submission Routines
const newPostHandler = async function (event) {
  event.preventDefault();
  form = event.target;
  const title = form.querySelector('input[name="post-title"]').value;
  const post = form.querySelector('textarea[name="post-body"]').value;
  console.log(title);
  console.log
  const newPost = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      post
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  console.log("working")
  document.location.reload();

};

const commentFormHandler = async function(event) {
  event.preventDefault();
  const form = event.target
  const postId = form.querySelector('input[name="post-id"]').value;
  const body = form.querySelector('textarea[name="comment-body"]').value;
  console.log(JSON.stringify({
    post_id: postId,
    comment: body
  }))

  if (body) {
    await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({
        post_id: postId,
        comment: body
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    document.location.reload();
  }
  
};

//#endregion
bttnAddPost.addEventListener('click', postToggle);
cancelBttn.addEventListener('click', postToggle);

formPost.addEventListener('submit', newPostHandler);

newCommentForms.forEach((form) => {
  form.addEventListener('submit', commentFormHandler)
});