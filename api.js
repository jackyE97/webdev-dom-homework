
export let listElement = document.getElementById('list');
export const baseURL = new URL("https://wedev-api.sky.pro/api/v2/:jacqueline-eller/comments");



// Функция обращения к серверу для загрузки комментария
export async function apiGetComments() {
    return fetch(baseURL, {
        method: "GET",
    }).then((response) => {
        if (response.status === 401) {
          throw new Error("Вы не авторизованы");
        }
                if (response.status === 200) {
            return response.json();
        }

        if (response.status === 500) {
            throw new Error("Сервер упал");
        }

      })  
};


// Функция обращения к серверу для публикации поста
export async function apiPostComments(nameInputElement, reviewInputElement) {
   return fetch(baseURL, {
        method: "POST",
        body: JSON.stringify({
            text: reviewInputElement.value,
            name: nameInputElement.value,
            forceError: true

        }),
    })
        .then((response) => {
            console.log(response);
            if (response.status === 201) {
                return response.json();
            }
            if (response.status === 400) {
                throw new Error("Неверный запрос");
            }
            if (response.status === 500) {
                throw new Error("Сервер упал");
            }
        });
};