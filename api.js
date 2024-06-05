export function getApi() {
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
};

export function postApi(name, text) {

  return fetch("https://wedev-api.sky.pro/api/v1/jacqueline-eller/comments",
  {
    method: "POST",
    body: JSON.stringify({
      name: name,
      text: text,
      // forceError: true,
    }),
  }).then((response) => {
    if(response.status === 400) {
      throw new Error ("Имя или комментарий должны содержать более 3 символов")
    }
    status = response.status
    if (!response.ok) { 
      throw new Error ("Ошибка сервера")
    }

    return response.json();
  })
}