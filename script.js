import Form from './form.js'
import formElements from './config.js'


new Form({
    formEl: document.querySelector('#form'),
    formContentEl: document.querySelector('#form-content'),
    elements: formElements,
});