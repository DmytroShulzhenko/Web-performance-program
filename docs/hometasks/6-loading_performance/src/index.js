import "./styles/index.scss"

/*
* Connect your service worker here
*/

function printState(state) {
  document.getElementById('state').innerHTML = state;
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then(registration => {
      console.log('SW registered: ', registration);

      let serviceWorker;

      document.getElementById('status').innerHTML = 'successful';

      if (registration.installing) {
        serviceWorker = registration.installing;

        printState('installing');
      } else if (registration.waiting) {
        serviceWorker = registration.waiting;

        printState('waiting');
      } else if (registration.active) {
        serviceWorker = registration.active;

        printState('active');
      }

      if (serviceWorker) {
        printState(serviceWorker.state);

        serviceWorker.addEventListener('statechange', function (e) {
          printState(e.target.state);
        });
      }
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);

      document.getElementById('status').innerHTML = registrationError;
    });
  });
} else {
  document.getElementById('status').innerHTML = 'unavailable';
}


