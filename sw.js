"use strict";

//导入workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');


//判断是否导入成功
if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}

//serviceWorker注册成功立即开启使用，不用刷新
self.addEventListener('install',function(event){
    event.waitUntil(self.skipWaiting);
});
self.addEventListener('activate',function(event){
    event.waitUntil(self.clients.claim());
});


//缓存所有js文件
workbox.routing.registerRoute(
    new RegExp('.*\.js'),
  //如果有网络优先加载网络内容
    workbox.strategies.networkFirst()
);


//缓存所有css文件
workbox.routing.registerRoute(
    /.*\.css/,
    // Use cache but update in the background ASAP
    workbox.strategies.staleWhileRevalidate({
        // Use a custom cache name
        cacheName: 'css-cache',
    })
);

workbox.routing.registerRoute(
    // Cache image files
    /.*\.(?:png|jpg|jpeg|svg|gif)/,
    workbox.strategies.cacheFirst({
        // Use a custom cache name
        cacheName: 'image-cache',
        plugins: [
            new workbox.expiration.Plugin({
                // 最多缓存20张图片
                maxEntries: 20,
                // 最大缓存时间为一周
                maxAgeSeconds: 7 * 24 * 60 * 60,
            })
        ],
    })
);
