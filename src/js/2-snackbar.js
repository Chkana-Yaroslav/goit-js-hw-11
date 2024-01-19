import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


document.addEventListener('DOMContentLoaded', function () {
  

  document.querySelector('.form').addEventListener('submit', function (event) {
    event.preventDefault();

    
    const delay = parseInt(document.querySelector('[name="delay"]').value);
    const status = document.querySelector('[name="state"]:checked').value;

    
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (status === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });

    promise.then((delay) => {
      
      iziToast.success({
        title: 'Fulfilled promise',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    }).catch((delay) => {
      iziToast.error({
        title: 'Rejected promise',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
  });
});