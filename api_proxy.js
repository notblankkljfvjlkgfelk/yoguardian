import { createProxyMiddleware } from 'http-proxy-middleware';

export default async function handler(req, res) {
  // Define the target URL you want to proxy to
  const target = 'https://example.com'; // Replace with your desired target URL

  // Create a new proxy middleware instance
  const proxy = createProxyMiddleware({
    target,
    changeOrigin: true, // Needed for virtual hosted sites
    pathRewrite: {
      '^/api/proxy': '', // Remove "/api/proxy" from the forwarded request path
    },
  });

  // Proxy the request to the target
  return proxy(req, res, (result) => {
    if (result instanceof Error) {
      throw result;
    }
    return res.end(result);
  });
}