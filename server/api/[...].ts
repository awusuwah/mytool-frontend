export default eventHandler((event) => {
  const path = event.path;
  const target = new URL("/webcc-api/v1/easy2use" + path.replace(/^\/api/, ""), `${process.env.API_BASE_URL}`).toString();

  return proxyRequest(event, target, {});
});
