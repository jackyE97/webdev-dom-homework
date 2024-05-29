<script>
  "use strict";
  const buttonElement = document.getElementById("add-button");
  const listElement = document.getElementById("list");
  const nameInputElement = document.getElementById("name-input");
  const commentInputElement = document.getElementById("comment-input");
  const commentElements = document.querySelectorAll('.comment');
  const loaderEl = document.getElementById("loader");
  const loaderMessageEl = document.getElementById('loader-message');
  const addForm = document.getElementById("add-form");

  let commentators = [
    // {
    //   name: "Глеб Фокин",
    //   time: "12.02.22 12:18",
    //   comment: "Это будет первый комментарий на этой странице",
    //   like: 3,
    //   isLiked: false,
    // },
    // {
    //   name: "Варвара Н.",
    //   time: "13.02.22 19:22",
    //   comment: "Мне нравится как оформлена эта страница! ❤️",
    //   like: 75,
    //   isLiked: true,
    // },
  ];


  //GET
  //API асинхронные запросы
  loaderEl.innerHTML = "Комментарии загружаются..."
  function getComments() {
    return fetch(
      'https://wedev-api.sky.pro/api/v1/jacqueline-eller/comments',
      {
        method: "GET",
      }).then((response) => {
        if (response.status === 500) {
          throw new Error("Сервер упал");
        }
        return response.json();
      })
      .then((resData) => {
        const appComments = resData.comments.map((commentator) => {
          return {
            name: commentator.author.name,
            time: new Date(commentator.date).toLocaleString(),
            comment: commentator.text,
            like: commentator.likes,
            isLiked: commentator.isLiked,
          };
        });
        commentators = appComments;
        renderCommentators();
        loaderEl.textContent = "";
        // addForm.classList.remove("hidden");  //отобразить форму ввода
        // loaderEl.classList.add('loader-hidden');
      }).catch((error) => {
        if (error.message === "Сервер упал") {
          alert("Сервер упал");
          return;
        };
      });
  }
  getComments();


  //ОБРАБОТЧИК КНОПКИ НАПИСАТЬ КОММЕНТАРИЙ//

  buttonElement.addEventListener("click", () => {
    nameInputElement.classList.remove("error");
    commentInputElement.classList.remove("error");
    if (nameInputElement.value.trim() === "") {
      nameInputElement.classList.add("error");
      return;
    } if (commentInputElement.value.trim() === "") {
      commentInputElement.classList.add("error");
      return;
    }

    // сохранить значения полей ввода
    const nameValue = nameInputElement.value;
    const commentValue = commentInputElement.value;

    sendMessage(nameValue, commentValue)
      .then((result) => {
        if (result === "ok") {
          nameInputElement.value = "";
          commentInputElement.value = "";
        }
        else {
          nameInputElement.value = nameValue;
          commentInputElement.value = commentValue;
        }

        loaderMessageEl.textContent = "";
        buttonElement.disabled = false;
        buttonElement.textContent = 'Написать';
      })
  });

  function sendMessage(name, text) {
    let status = 0

    buttonElement.disabled = true;
    loaderMessageEl.innerHTML = "комментарий добавляется..."

    // //СКРЫВАЕМ ФОРМУ
    // const hideFormEl = document.querySelector('.add-form');
    // hideFormEl.style.display = 'none';

    return fetch("https://wedev-api.sky.pro/api/v1/jacqueline-eller/comments",
      {
        method: "POST",
        body: JSON.stringify({
          name: name,
          text: text,
          // forceError: true,
        }),
      }).then((response) => {
        status = response.status

        return response.json();
      }).then((data) => {
        if (status >= 400) {
          throw new Error(data.error);
        }

        getComments();
        // loaderMessageEl.textContent = "";
        // nameInputElement.value = "";
        // commentInputElement.value = "";
        //// hideFormEl.style.display = 'flex';
        // renderCommentators();

        return "ok"
      })
      .catch((error) => {
        if (error === "Failed to fetch") {
          alert("Проверьте интернет")
        }
        else {
          alert(error.message)
        }
        // if (error.message === "Сервер упал") {
        //   alert("Нет интернета");
        //   nameInputElement.value = nameValue;
        //   commentInputElement.value = commentValue;
        //   return;
        // }
        // else if (error.message === "Короткие вводимые данные") {
        //   alert("Имя или комментарий слишком короткие");
        //   nameInputElement.value = nameValue;
        //   commentInputElement.value = commentValue;
        // }
        // else if (error instanceof TypeError) {
        //   alert("Кажется, у вас сломался интернет, попробуйте позже");
        //   nameInputElement.value = nameValue;
        //   commentInputElement.value = commentValue;
        //   return;
        // }
        // console.log(error);

        return "error"
      })
  }


  const renderCommentators = () => {
    const commentatorsHtml = commentators
      .map((commentator, index) => {
        return `<li class="comment" data-index="${index}" data-name="${commentator.name}">
        <div class="comment-header">
          <div>${commentator.name}</div>
          <div>${commentator.time}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">${commentator.comment}</div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${commentator.like}</span>
            <button data-like="${index}" data-index="${index}" class="like-button ${commentator.isLiked ? '-active-like' : ''}"></button>
          </div>
        </div>
      </li>`;
      })
      .join("");

    listElement.innerHTML = commentatorsHtml;

    // ОТВЕТЫ НА КОММЕНТЫ//

    const answerComment = () => {
      const commentsElements = document.querySelectorAll('.comment');
      for (const commentElement of commentsElements) {
        commentElement.addEventListener('click', (e) => {

          const index = commentElement.dataset.index;
          console.log(index)
          if (index !== null) {
            const commentator = commentators[index];
            commentInputElement.value = `> ${commentator.comment} \n ${commentator.name}.,`;
            renderCommentators();
            const styleQuote = document.querySelectorAll(".quote");
          }
        });
      }
    };
    answerComment();
    initEventListeners();
  };

  ////ЛАЙКИ/////

  // добавляет обработчики кликов ко всем классам comment
  const initEventListeners = () => {
    // находит все элементы с классом comment в разметке
    const commentElements = document.querySelectorAll('.comment');

    //цикл проходит по каждому элементу в списке
    for (const commentElement of commentElements) {
      //добавляет обработчик клика на конкретный элемент в списке
      commentElement.addEventListener('click', () => {
      });
    }

    for (const likeButton of document.querySelectorAll('.like-button')) {
      likeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        const index = likeButton.dataset.index;
        const commentator = commentators[index];
        commentator.like = commentator.isLiked
          ? commentator.like - 1
          : commentator.like + 1;
        commentator.isLiked = !commentator.isLiked;

        renderCommentators();
      });
    }
  };


  // const oldListHtml = listElement.innerHTML;
  // listElement.innerHTML = oldListHtml + `<li class="comment" data-name="${nameInputElement.value}">
  //     <div class="comment-header">
  //       <div>${nameInputElement.value}</div>
  //       <div>${new Date().toLocaleString()}</div>
  //     </div>
  //     <div class="comment-body">
  //       <div class="comment-text">${commentInputElement.value}</div>
  //     </div>
  //     <div class="comment-footer">
  //       <div class="likes">
  //         <span class="likes-counter">'0'</span>
  //         <button class="like-button -active-like"></button>
  //       </div>
  //     </div>
  //   </li>`;

  // очищаем форму после отправки заполненного комментария
  const form = document.getElementById('myForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // добавили, чтобы не перезагружалась страница
    e.target.reset();
  });

  initEventListeners();
  renderCommentators();

</script>