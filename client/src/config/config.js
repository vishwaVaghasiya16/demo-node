let baseUrl = "";
switch (window.location.host) {
  case "localhost:5175":
    baseUrl = "http://localhost:8080";
    break;
  case "206.189.129.0:5175":
    baseUrl = "http://64.227.129.58:8080";
    break;
  default:
    break;
}

export { baseUrl };
