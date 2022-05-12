import { createError } from 'h3';
import { withLeadingSlash, withoutTrailingSlash, parseURL } from 'ufo';
import { promises } from 'fs';
import { resolve, dirname } from 'pathe';
import { fileURLToPath } from 'url';
import { c as buildAssetsDir } from './server.mjs';
import 'unenv/runtime/polyfill/fetch.node';
import 'http';
import 'https';
import 'destr';
import 'ohmyfetch';
import 'unenv/runtime/fetch/index';
import 'defu';

const assets = {
  "/200.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"6ca-7h0NxM/dZbUU8j2kvHT7fCFYKxI\"",
    "mtime": "2022-05-12T08:58:40.513Z",
    "path": "../public/200.html"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"1d7de-RFMVqgm8CJ4z9Aqlxm6PdyTRN3s\"",
    "mtime": "2022-05-12T08:58:38.604Z",
    "path": "../public/favicon.ico"
  },
  "/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"6ca-7h0NxM/dZbUU8j2kvHT7fCFYKxI\"",
    "mtime": "2022-05-12T08:58:40.502Z",
    "path": "../public/index.html"
  },
  "/_nuxt/10734d2.js": {
    "type": "application/javascript",
    "etag": "\"15f-nWvCRCfAfQMLLmpbKMlL+1VrwYo\"",
    "mtime": "2022-05-12T08:58:38.607Z",
    "path": "../public/_nuxt/10734d2.js"
  },
  "/_nuxt/4ea5940.js": {
    "type": "application/javascript",
    "etag": "\"77-6PvMTDusdVO7frhwPJh6/k8O1OU\"",
    "mtime": "2022-05-12T08:58:38.606Z",
    "path": "../public/_nuxt/4ea5940.js"
  },
  "/_nuxt/5c7537a.js": {
    "type": "application/javascript",
    "etag": "\"35b0c-fAonxXlpxynOpAU+RSceKReRWF0\"",
    "mtime": "2022-05-12T08:58:38.606Z",
    "path": "../public/_nuxt/5c7537a.js"
  },
  "/_nuxt/8a70f0a.js": {
    "type": "application/javascript",
    "etag": "\"92c-RJwSVOAC2LEeRaxgsPwepRqEbRg\"",
    "mtime": "2022-05-12T08:58:38.606Z",
    "path": "../public/_nuxt/8a70f0a.js"
  },
  "/_nuxt/d5b4dbb.js": {
    "type": "application/javascript",
    "etag": "\"1e4cb-RCVDqIFYUhRKg6YgWZN/HyNI67M\"",
    "mtime": "2022-05-12T08:58:38.605Z",
    "path": "../public/_nuxt/d5b4dbb.js"
  }
};

const mainDir = dirname(fileURLToPath(globalThis.entryURL));

function readAsset (id) {
  return promises.readFile(resolve(mainDir, getAsset(id).path))
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const TWO_DAYS = 2 * 60 * 60 * 24;
const STATIC_ASSETS_BASE = "/_nuxt/static" + "/" + "1652345919";
async function serveStatic(req, res) {
  if (!METHODS.includes(req.method)) {
    return;
  }
  let id = decodeURIComponent(withLeadingSlash(withoutTrailingSlash(parseURL(req.url).pathname)));
  let asset;
  for (const _id of [id, id + "/index.html"]) {
    const _asset = getAsset(_id);
    if (_asset) {
      asset = _asset;
      id = _id;
      break;
    }
  }
  const isBuildAsset = id.startsWith(buildAssetsDir());
  if (!asset) {
    if (isBuildAsset && !id.startsWith(STATIC_ASSETS_BASE)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    res.statusCode = 304;
    return res.end("Not Modified (etag)");
  }
  const ifModifiedSinceH = req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      res.statusCode = 304;
      return res.end("Not Modified (mtime)");
    }
  }
  if (asset.type) {
    res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag) {
    res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime) {
    res.setHeader("Last-Modified", asset.mtime);
  }
  if (isBuildAsset) {
    res.setHeader("Cache-Control", `max-age=${TWO_DAYS}, immutable`);
  }
  const contents = await readAsset(id);
  return res.end(contents);
}

export { serveStatic as default };
