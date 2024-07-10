// Защита вода 

export const safeMode = (htmlString) => {
    return htmlString.replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  };

// Функция уведомления пользователя 
export function successfully() {
  let notification = document.createElement("div");
  notification.textContent = "Регистрация прошла успешно!";
  notification.style.position = "fixed";
  notification.style.top = "5%";
  notification.style.left = "32%";
  notification.style.color = "#FFFFF";
  notification.style.padding = "30px";

  
  document.body.appendChild(notification);

  setTimeout(function() {  // задержка по времени
    notification.remove();
  }, 5000);
};   