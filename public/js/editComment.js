const postId = document.querySelector('input[name="post-id"]').value;
const commentId = document.querySelector('input[name="comment-id"]').value;

const editFormHandler = async function(event) {
  event.preventDefault();

  const comment = document.querySelector('textarea[name="comment-body"]').value;

  await fetch(`/api/posts/${commentId}`, {
    method: 'PUT',
    body: JSON.stringify({
      comment
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  document.location.replace(`/post/${postId}`);
};

const deleteClickHandler = async function() {
  await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE'
  });

  document.location.replace('/dashboard');
};

document
  .querySelector('#edit-comment-form')
  .addEventListener('submit', editFormHandler);
document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteClickHandler);
