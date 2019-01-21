// register service worker here

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}


fetch('https://www.aphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSFT&apikey=demo')
	.then((res) => {
		return res.json()
	})
	.then((res) => {
		var x = document.getElementById("body");
		
		for (var key in res["Time Series (Daily)"]) {
			x.innerHTML += `
	<div class="daily_price">
		<div>Date: <span class="">${key}</span></div>
		<div>open: <span class="">${res["Time Series (Daily)"][key]["1. open"]}</span></div>
		<div>high: <span class="">${res["Time Series (Daily)"][key]["2. high"]}</span></div>
		<div>low: <span class="">${res["Time Series (Daily)"][key]["3. low"]}</span></div>
		<div>close: <span class="">${res["Time Series (Daily)"][key]["4. close"]}</span></div>
	</div>`;
		}
	})
	.catch((err) => {
		fetch('./offline.php')
			.then((res) => { return res.text() })
			.then((res) => {
				document.getElementById("body").innerHTML = res;
			})
			.catch( (err) => { console.log(err) });
	});