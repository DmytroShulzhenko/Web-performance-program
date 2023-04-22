// Here make implementation of service worker
self.addEventListener('install', function(e) {
  console.log('Install Event:', e);

  e.waitUntil(
    caches.open('mysite-static-v3').then(
      function (cache) {
        return cache.addAll([
          '/',
          '/index.html',
          '/index.js',
          '/styles/style.scss',
        ]);
      }
    ),
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then(res => {
              return caches.open('dynamic')
                .then(cache => {
                  cache.put(event.request.url, res.clone());
                  return res;
                })
            });
        }
      })
  );
});

self.addEventListener('activate', function(e) {
  console.log('Activate Event:', e);
});
