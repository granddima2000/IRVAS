const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector);

        trigger.forEach(item => { // Обрабатываем псевдомассив и навешиваем на каждый обработчик события
            item.addEventListener('click', (e) => {
                if (e.target) { // Если будет существовать этот элемент на который кликнул пользователь
                    e.preventDefault();
                }
    
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // не позволяет листать страницу в модальном окне
                // document.body.classList.add('modal-open'); // bootstrap специальный класс modal-open
            });
        });

        close.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            // document.body.classList.remove('modal-open'); // bootstrap специальный класс modal-open
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
                // document.body.classList.remove('modal-open'); // bootstrap специальный класс modal-open
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = 'hidden';
        }, time)
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    showModalByTime('.popup', 3000);
};

export default modals;