import 'regenerator-runtime';
import CacheHelper from './utils/cache-helper';

const assetsToCache = [
  './',
  './icons/vk-72.png',
  './icons/vk-96.png',
  './icons/vk-128.png',
  './icons/vk-144.png',
  './icons/vk-152.png',
  './icons/vk-192.png',
  './icons/vk-384.png',
  './icons/vk-512.png',
  './index.html',
  './vklogo.png',
  './app.bundle.js',
  './app.webmanifest',
  './sw.bundle.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});
