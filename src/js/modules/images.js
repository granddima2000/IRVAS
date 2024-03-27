const images = () => {
    const imgPopup = document.createElement('div'),
          workSection = document.querySelector('.works'),
          bigImage = document.createElement('img');

    imgPopup.classList.add('popup');
    workSection.appendChild(imgPopup);

    imgPopup.style.justifyContent = 'center';
    imgPopup.style.alignItems = 'center';
    imgPopup.style.display = 'none';

    imgPopup.appendChild(bigImage);

    workSection.addEventListener('click', (e) => {
        e.preventDefault();

        let target = e.target;

        if (target && target.classList.contains('preview')) {
            imgPopup.style.display = 'flex'; // Показываем модалку
            const path = target.parentNode.getAttribute('href'); //обр к родителя и получаем его атрибут
            bigImage.setAttribute('src', path); //у тега img создается атрибут src и получает атрибут родителя
            bigImage.style.cssText = 'max-width:100%;max-height:100%;object-fit:contain;';
            document.body.style.overflow = 'hidden';
        }

        if (target && target.matches('div.popup')) { //при клике будет найдена подложка, т.е.div.popup
            imgPopup.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
};

export default images;