import { URL, pathToFileURL } from 'url';
import { cwd } from 'process';
import cssToJS from 'transform-css-to-js';

const baseURL = pathToFileURL(`${cwd()}/`).href;

export function resolve(specifier, context, defaultResolve) {
  const { parentURL = baseURL } = context;

  if (specifier.endsWith('.css')) {
    return { url: new URL(specifier, parentURL).href };
  }

  return defaultResolve(specifier, context, defaultResolve);
}

export async function load(url, context, defaultLoad) {
  if (url.endsWith('.css')) {
    const { source: rawSource } = await defaultLoad(url, { format: 'module' });

    return {
      format: 'module',
      source: 'export default ' + cssToJS(rawSource.toString(), true)
    };
  }

  return defaultLoad(url, context, defaultLoad);
}
