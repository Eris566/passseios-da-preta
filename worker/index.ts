export default {
  async fetch(request, env, ctx) {
    // Se o Vite Assets/Page Handler existir, serve o front-end
    if (env.ASSETS) {
      return await env.ASSETS.fetch(request);
    }
    return new Response("Not Found", { status: 404 });
  },
};