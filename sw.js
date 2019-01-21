// service worker

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
	if (event.request.url.endsWith('apikey=demo')) {
		fetch(event.request.url)
		.then((res) => {
			if (res.status == 200) {
				console.log('HIII');
			} else {
				console.log('error');
			}
		}).catch((err) => {
			event.respondWith( () => {
				console.log('HAN');
				// fetch('./offline.php')
				// 	.then((res) => {
				// 		return res.text();
				// 	})
				// 	.then((res) => {
				// 		document.getElementsByName("body").innerHTML = res;
				// 	})
			});
		});
	}
});
