import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          modal = document.querySelector('.popup_calc_end');

    checkNumInputs('input[name="user_phone"]');

    // Оповещаем пользователя
    const message = { 
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро с вами свяжутся',
        failure: 'Что-то пошло не так' 
    };

    //переменная с функцией, которая будет отвечать за отправку данных на сервер
    const postData = async (url, data) => { // data - данные уходящие на сервер
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text(); // res.text() серверный файл возвращает текстовые данные
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage); // Помещаем блок в конец нашей формы

            const formData = new FormData(item); // Собираем все данные из введеной формы
            // FormData это объект, ктр соберет все содержание в инпутах и поместить в перемен formData
            if (item.getAttribute('data-calc') === "end") {
                for (let key in state) { // тогда берем данные из state перебираем и 
                    formData.append(key, state[key]); // отправляем в formData с помощью append
                }
            }

            postData('assets/server.php', formData) // отправляем запрос на сервер
            .then(res => {
                console.log(res);
                statusMessage.textContent = message.success;
            })
            .catch(() => {
                statusMessage.textContent = message.failure;
            })
            .finally(() => {
                clearInputs();
                Object.keys(state).forEach(key => delete state[key]);
                setTimeout(() => {
                    modal.style.display = 'none'
                    statusMessage.remove();
                }, 3000);
            });
        });
    });
};

export default forms;
