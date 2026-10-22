// Jobday site Worker: host-based 301 redirects to the canonical host,
// everything else is served from static assets (./public).
const CANONICAL_HOST = "jobday.app";
const REDIRECT_HOSTS = new Set(["www.jobday.app", "scheduler.aiconspro.com"]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (REDIRECT_HOSTS.has(url.hostname)) {
      url.protocol = "https:";
      url.hostname = CANONICAL_HOST;
      url.port = "";
      return Response.redirect(url.toString(), 301); // keeps path + query
    }
    return env.ASSETS.fetch(request);
  },
};
