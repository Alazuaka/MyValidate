"use strict";
// document.addEventListener()

const RULE = {
  required() {
    return !!this.value.trim();
  },
  regexp(value) {
    return value.test(this.value.trim());
  },
  minLength(value) {
    return this.value.trim().length >= value;
  },
  maxLength(value) {
    return this.value.trim().length <= value;
  },
  function(value) {
    return value(arguments);
  },
};

const defaultMessages = {
  required: "Is required",
  maxLength: "To long value",
  minLength: "To short value",
  regexp: "Is not valid value",
  function: "Function returned false",
};

const defaultCssClass = {
  errorContainer: "error",
  errorList: "error-list",
  errorItem: "error-list__item",
  errorFieldCssClass: "is-error",
  successFieldCssClass: "is-success",
  errorLabelCssClass: "error-label",
  successLabelCssClass: "success-label",
};

const createElement = (HTMLelement = "div", CssClass) => {
  let $element = document.createElement(HTMLelement);
  $element.classList.add(CssClass);
  return $element;
};

class MinValidate {
  isValidationSuccess = false;
  fieldArr = [];
  cssClass = {
    errorContainer: null,
    errorList: null,
    errorItem: null,
    errorFieldCssClass: null,
    successFieldCssClass: null,
    errorLabelCssClass: null,
    successLabelCssClass: null,
  };
  options = {
    _formErrorConteiner: null,
    set formErrorConteiner(selector) {
      this._formErrorConteiner =
        typeof selector === "object"
          ? selector
          : document.querySelector(selector);
    },
    get formErrorConteiner() {
      return this._formErrorConteiner;
    },
  };
  constructor(form, options) {
    form = typeof form === "object" ? form : document.querySelector(form);
    this._form = form;
    this.options.formErrorConteiner = options.formErrorConteiner;

    if (options.cssClass) {
      this.cssClass = options.cssClass
    }

    this._form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      if (this.options.formErrorConteiner) {
        this.options.formErrorConteiner.innerHTML = "";
        let $errorList = createElement(
          "ul",
          this.cssClass.errorList || defaultCssClass.errorList
        );
        this.options.formErrorConteiner.append($errorList);

        for (const field of this.fieldArr) {
          for (const config of field.rules) {
            let isRule = RULE[config.rule].call(field.input, config.value);
            if (!isRule) {
              if (this.options.formErrorConteiner) {
                const $item = createElement(
                  "li",
                  this.cssClass.errorItem || defaultCssClass.errorItem
                );
                $item.innerText =
                  config.errorMessage || defaultMessages[config.rule];
                $errorList.append($item);

                field.input.classList.add(defaultCssClass.errorFieldCssClass);
                field.input.classList.remove(
                  defaultCssClass.successFieldCssClass
                );

                break;
              }
            }

            field.input.classList.add(defaultCssClass.successFieldCssClass);
            field.input.classList.remove(defaultCssClass.errorFieldCssClass);
          }
        }
        if ($errorList.innerHTML === "") {
          this.options.formErrorConteiner.innerHTML = "";
        }
      }
    });
  }

  addField(selector, rules, ...options) {
    const form = this._form,
      input =
        typeof selector === "object" ? selector : form.querySelector(selector);

    this.fieldArr.push({ input, rules, options });

    return this;
  }
}
