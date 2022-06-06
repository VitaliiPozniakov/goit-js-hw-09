// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";

const refs = {
input: document.querySelector(`#datetime-picker`),
btnStart: document.querySelector(`button[type="button"]`),

daysOutput:document.querySelector(`span[data-days]`),
hoursOutput:document.querySelector(`span[data-hours]`),
minutesOutput:document.querySelector(`span[data-minutes]`),
secondsOutput:document.querySelector(`span[data-seconds]`),
}



console.log(refs.secondsOutput)





refs.btnStart.setAttribute('disabled', '');



const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    //   console.log(selectedDates[0]);


    const currentDate = new Date();
    console.log(currentDate)
    //   console.log(currentDate.getTime())
    //   console.log(selectedDates[0].getTime())

      if (selectedDates[0].getTime() < currentDate.getTime()) {
      alert("Please choose a date in the future")  
    //   console.log(`date late`)
      }
      else {
        refs.btnStart.removeAttribute('disabled', '');
      }



refs.btnStart.addEventListener(`click`, onBtnStartClick)

function onBtnStartClick (e) {
    const timerId =  setInterval(
       () => {

        const currentDate = new Date();

        const deltaTime = selectedDates[0].getTime() - currentDate.getTime()
        console.log(deltaTime)
        
        const {days, hours, minutes, seconds} = convertMs (deltaTime)
        console.log(days, hours, minutes, seconds)

           refs.daysOutput.textContent = days
           refs.hoursOutput.textContent = hours
           refs.minutesOutput.textContent = minutes
           refs.secondsOutput.textContent = seconds
       }
        , 1000 )
}


    },
  };
// flatpickr(refs.input, {});

flatpickr("#datetime-picker", options);



// console.log(flatpickr)

console.log(refs.input.value)

// console.log(options.onClose)



function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day))  ;
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour)) ;
    // Remaining minutes
    const minutes = addLeadingZero (Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second)) ;
  
    return { days, hours, minutes, seconds };
  }
  
//   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value){
    return String(value).padStart(2, '0')
}