class Form {
    constructor(config) {
        this.config = config;
        this.createElements();

        this.submitEvent();
    }
    formElements(element) {
        if (['text', 'password'].includes(element.type)) {
            return `
                <input type="${element.type}" name="${element.name}"  data-min="3"  class="js-form-input border border-gray-300 h-[40px] w-full rounded-[5px] px-[15px]">
            `
        } else if (element.type === 'select' && typeof element.options === 'object' && element?.options?.length) {
            let html = '<option value="">Seç</option>'
            for (let option of element.options) {
                html += `<option value="${option.value}">${option.name}</option>`
            }
            return `
                <select name="${element.name}" class="js-form-input border border-gray-300 h-[40px] w-full rounded-[5px] px-[15px]">
                    ${html}
                </select>
            `
        }
    }

    formGroup(el) {
        return `
            <div>
                <label class="flex font-bold text-[16px]">${el.label}</label>
                ${this.formElements(el)}
            </div>
        `
    }

    createElements() {
        if (this.config?.elements && this.config?.elements?.length && typeof this.config?.elements === 'object') {
            for (let element of this.config.elements) {
                this.config.formContentEl.innerHTML += this.formGroup(element);
            }
        }
    }

    findElement(name) {
        let find;
        for (let el of this.config.elements) {
            if (el.name.toString().toLowerCase() === name.toString().toLowerCase()) {
                find = el;
            }
        }
        return find;
    }

    errorMessage(element, message) {
        element.classList.add('border-red-500');
        element.parentElement.insertAdjacentHTML('beforeend', `<p data-error-message="true" class="text-red-500 text-sm mt-[2px]">${message}</p>`);
        return false;
    };

    removeErrorMessage() {

        const paragraphs = this.config.formEl.querySelectorAll('p[data-error-message="true"]')
        if (paragraphs && paragraphs.length > 0) {
            for (let p of paragraphs) {
                p.parentElement.querySelector('.js-form-input').classList.remove('border-red-500')
                p.remove();

            }
        }
    };

    validateEmail(email) {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    validatePhoneNumber(phone) {
        return String(phone)
            .match(
                /^(\+?\d{1,4}|\d{1,4})?\s?\d{10}$/
            );
    };

    isNumber(str) {
        var pattern = /^\d+\.?\d*$/;
        return pattern.test(str);
    };

    submitEvent() {
        this.config.formEl.addEventListener('submit', (e) => {
            e.preventDefault();
            this.removeErrorMessage();

            for (let el of e.target.elements) {

                if (el.tagName !== 'BUTTON') {
                    const currentElement = this.findElement(el.name);
                    const value = el.value.trim();
                    const error = currentElement.errors
                    if (error && typeof error === 'object') {

                        if (error?.required && !value) {
                            this.errorMessage(el, error?.required)
                        }

                    }
                }

            };
        });
    };
}


export default Form;