import axios from "axios";

const clearBtn = document.querySelectorAll(".comment-clear");
const commentNumber = document.getElementById("jsCommentNumber");

let currentComment;

const deleteComment = () => {
  currentComment.remove();
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const sendCommentDel = async (commentId) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/${commentId}/delete-comment`,
    method: "POST",
  });
  if (response.status === 200) {
    deleteComment();
  }
};

const handleClearClick = (event) => {
  currentComment = event.target.parentNode;
  sendCommentDel(currentComment.id);
};

const init = () => {
  for (let i = 0; i < clearBtn.length; i++) {
    clearBtn[i].addEventListener("click", handleClearClick);
  }
};

if (clearBtn) {
  init();
}
