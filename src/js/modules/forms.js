const forms = () => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input');
    // Оповещаем пользователя
    const message = { 
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро с вами свяжутся',
        failure: 'Что-то пошло не так' 
    };

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
                setTimeout(() => {
                    statusMessage.remove();
                }, 3000);
            });
        });
    });
};

export default forms;
