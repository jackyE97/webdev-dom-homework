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