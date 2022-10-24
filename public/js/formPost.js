const modalForm = document.getElementById("modalForm")


const cancelBttn = document.getElementById("cancelBttn");




const bttnSignIn = document.getElementById('bttnSignIn');


const bttnSignUp = document.querySelector('#bttnSignUp');

const formPost = document.querySelector('#new-post-form')
const bttnAddPost = document.getElementById("addPost");
const bttnEditPosts = document.querySelectorAll('.editPost')
const bttnDeletePosts = document.querySelectorAll('.deletePost')

const formComment = document.getElementById("createPostForm");
const bttnAddComment = document.getElementById("addPost");
const bttnEditComments = document.querySelectorAll('.editPost')
const bttnDeleteComments = document.querySelectorAll('.deletePost')

var showModal = (modalForm.dataset.activeForm = "none") ? false : true;

const toggleDisplay = (event,state,element1 = "",element2="") => {
  console.log("this is running")
  modalForm.dataset.activeForm = state
  console.log(state)
  var display = (state = "none") ? "flex" : "none";
  modalForm.style.display = display
  console.log(display)
  switch (state) {
    case "addPost":
      modalForm.append(template(data))
      break;
    case "signin":
      modalForm.dataset = {"whichPartial": "login","additionaldata":{}};
      break;
    case "login":
        //code b
        break;
    default:
      //code c
      break;
  }
}

const addPost = () => {
  (modalForm.dataset.activeForm = "addPost")
  showModal = !showModal;
  modalForm.innerHTML = `{{>create}}`
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
  const title = document.querySelector('input[name="post-title"]').value;
  const post = document.querySelector('textarea[name="post-body"]').value;
  const newPost = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      post,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  console.log("working")
  // document.location.replace('/dashboard');

};




//#endregion

bttnEditPosts.forEach((editBttn) => {
  editBttn.addEventListener('click', (event) => {
    event.preventDefault();
    const test = event.target
    console.log(test.dataset.id)
  })
});
bttnDeletePosts.forEach((deleteBttn) => {
  deleteBttn.addEventListener('click', () => (console.log("deleteBttn working")))
});
bttnAddPost.addEventListener('click', (event) => {toggleDisplay(event,"addPost")});
(cancelBttn) ? cancelBttn.addEventListener('click', toggleDisplay("none")): "";


(bttnSignIn) ? bttnSignIn.addEventListener('click', (event) => {toggleDisplay(event,"signin")}): "";

(formPost) ? formPost.addEventListener('submit', newPostHandler): "";

