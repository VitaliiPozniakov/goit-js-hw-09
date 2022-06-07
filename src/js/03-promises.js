import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
  form: document.querySelector(`.form`),
  delayField: document.querySelector(`input[name="delay"]`),
  stepField: document.querySelector(`input[name="step"]`),
  amountField: document.querySelector(`input[name="amount"]`),
  btnSubmit:  document.querySelector(`button[type="submit"]`),
}

// console.log(refs.stepField)
// console.log(Number(refs.delayField.value) )
// console.log(refs.stepField.value)
// let position = 0


// console.log(delay)


refs.form.addEventListener(`submit`, onFormSubmit);

function onFormSubmit(e) {
e.preventDefault()

let counter = 0
let nextStepCf = 0
const timerId = setInterval(() => {
  counter += 1
  // console.log(counter)
  if (counter === Number(refs.amountField.value)){
    clearInterval(timerId)
  }

  const delay = Number(refs.delayField.value ) + nextStepCf * Number(refs.stepField.value) 
nextStepCf += 1
  // console.log(counter)
// console.log(delay)

  createPromise(counter, delay)
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });

  // console.log(`kff`)
}
, Number(refs.delayField.value ))



  // console.log(refs.delayField.value)
  // console.log(refs.stepField.value)
  // console.log(refs.amountField.value)

}


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
  

}
