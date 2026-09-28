// ===============================
// Модальное окно и форма заявки
// ===============================

// Элементы страницы. Поиск по id и по БЭМ-классу кнопок заказа.
const orderDialog = document.getElementById('order-dialog');
const orderForm = document.getElementById('order-form');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');
const successMessage = document.getElementById('success-message');
const orderButtons = document.querySelectorAll('.product-card__button[data-product]');

// Убираем признаки ошибок со всех полей формы.
function clearValidationState() {
  Array.from(orderForm.elements).forEach((element) => {
    element.removeAttribute('aria-invalid');
  });
}

// Помечаем некорректные поля атрибутом aria-invalid.
// Внешний вид ошибки задаётся в CSS: .order-form__input[aria-invalid="true"].
function markInvalidFields() {
  Array.from(orderForm.elements).forEach((element) => {
    if (element.willValidate && !element.checkValidity()) {
      element.setAttribute('aria-invalid', 'true');
    }
  });
}

// Открываем окно и записываем выбранный товар в скрытое поле.
function openOrderDialog(productName) {
  selectedProductInput.value = productName;
  orderDialog.showModal();
}

// Отправка формы: проверка, сообщение об успехе, закрытие окна.
function handleOrderSubmit(event) {
  // backend пока не подключён, поэтому стандартную отправку отменяем.
  event.preventDefault();

  clearValidationState();

  // Проверяем встроенные HTML-ограничения формы.
  if (!orderForm.checkValidity()) {
    markInvalidFields();
    orderForm.reportValidity();
    return;
  }

  successMessage.hidden = false;
  orderForm.reset();
  orderDialog.close();
}

// Подключаем обработчики, только если окно есть на странице.
if (orderDialog && orderForm) {
  orderButtons.forEach((button) => {
    button.addEventListener('click', () => openOrderDialog(button.dataset.product));
  });

  closeDialogButton.addEventListener('click', () => orderDialog.close());
  orderForm.addEventListener('submit', handleOrderSubmit);
}
