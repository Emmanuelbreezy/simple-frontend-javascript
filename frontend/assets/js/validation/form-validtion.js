
export const isRequired = eleVal => eleVal === '' ? false : true;
export const isMax = (len,min, max) => len < min || length > max ? false : true;

export  function displayError(input,message){
        const formfield = input.parentElement;
        const error = formfield.querySelector('small');
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        error.textContent = message;
}

export function displaySuccess(input){
        const formfield = input.parentElement;
        const error = formfield.querySelector('small');
        input.classList.remove('is-invalid');
        // input.classList.add('is-valid');
        error.textContent = '';
}