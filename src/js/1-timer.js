

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startButton = document.querySelector('[data-start]');


const datetimePicker = flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    const currentTime = currentDate.getTime();
    const selectedTime = selectedDate.getTime();

    if (selectedTime <= currentTime) {
      // alert('Please choose a date in the future');
      iziToast.success({
        message: `Please choose a date in the future`,
      });

      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});



let countdownInterval;

function startCountdown(countdownEndTime) {
  countdownInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    const timeDifference = countdownEndTime - currentTime;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      // alert('Countdown Finished');
      iziToast.success({
        message: `Countdown Finished`,
      });

      updateInterface(0);
      
    } else {
      updateInterface(timeDifference);
      
      document.getElementById('datetime-picker').disabled = true;
    }
  }, 1000);
}

function updateInterface(timeDifference) {
  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startButton.disabled = true;

startButton.addEventListener('click', () => {
  const selectedDate = datetimePicker.selectedDates[0];
  const countdownEndTime = selectedDate.getTime();

  startButton.disabled = true; 
  
  startCountdown(countdownEndTime);
});