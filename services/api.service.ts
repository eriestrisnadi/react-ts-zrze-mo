import { extend } from "umi-request";
import { baseUrl, apiKey, endpoints } from "../constants/api.config";
import { proxyUrl } from "../constants/proxy.config";

const instance = extend({
  prefix: proxyUrl + baseUrl,
  params: {
    api_key: apiKey,
    language: "en-US"
  }
});

instance.interceptors.request.use((url, options) => {
  const headers = options.headers as any;
  if (
    typeof headers.endpoint === "undefined" &&
    !!!endpoints[headers.endpoint]
  ) {
    return { url, options };
  }

  const endpoint = [options.prefix, headers.endpoint].join("");

  url = url.replace(options.prefix, "");

  return {
    url: [endpoint, url].join("/"),
    options
  };
});

// instance.interceptors.response.use(response => response.data);

export const apiService = instance;

export default apiService;
