// Защита ввода 
export const safeMode = (htmlString) => {
    return htmlString.replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  };