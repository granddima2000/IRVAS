const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlvay = true) { // closeClickOverlvay = true Если мы не будем передавать аргумент, то наше модальное окно будет закрываться при клике на подложку
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'); // Закрываем все ненужные модальные окна

        trigger.forEach(item => { // Обрабатываем псевдомассив и навешиваем на каждый обработчик события
            item.addEventListener('click', (e) => {
                if (e.target) { // Если будет существовать этот элемент на который кликнул пользователь
                    e.preventDefault();
                }

                windows.forEach(item => {
                    item.style.display = 'none';
                });  //при нажатии на триггер все остальные мод окна закрываются
    
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // не позволяет листать страницу в модальном окне
                // document.body.classList.add('modal-open'); // bootstrap специальный класс modal-open
            });
        });

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            }); //при нажатии на Х все остальные мод окна закрываются

            modal.style.display = 'none';
            document.body.style.overflow = '';
            // document.body.classList.remove('modal-open'); // bootstrap специальный класс modal-open
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlvay) { //closeClickOverlay при наж на подложку она не закр
                windows.forEach(item => {
                    item.style.display = 'none';
                }); //при нажатии на подложку все остальные мод окна закрываются

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
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    // showModalByTime('.popup', 60000);
};

export default modals;