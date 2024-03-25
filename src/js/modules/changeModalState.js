import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
          windowWidth = document.querySelectorAll('#width'), // Прописали All, потому что даже если 1 элемент, то все равно создаст псевдомассив с 1 элементом
          windowHeight = document.querySelectorAll('#height'), // Прописали All, потому что даже если 1 элемент, то все равно создаст псевдомассив с 1 элементом
          windowType = document.querySelectorAll('#view_type'), // Прописали All, потому что даже если 1 элемент, то все равно создаст псевдомассив с 1 элементом
          windowProfile = document.querySelectorAll('.checkbox');

    checkNumInputs('#width');
    checkNumInputs('#height');

    function bindActionToElems(event, elem, prop) { 
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch(item.nodeName) { // nodeName - определяет
                    case 'SPAN' :
                        state[prop] = i;
                        break;
                    case 'INPUT' : 
                        if (item.getAttribute('type') === 'checkbox') {
                            i === 0 ? state[prop] = "Холодное" : state[prop] = "Теплое";
                            elem.forEach((box, j) => {
                                box.checked = false;
                                if(i == j) {
                                    box.checked = true;
                                }
                            });
                        } else {
                            state[prop] = item.value;
                        }
                        break;
                    case 'SELECT' :
                        state[prop] = item.value;
                        break;
                    
                }

                if(Object.keys(state).length == 3){
                    document.querySelector('.popup_calc_button').removeAttribute('disabled');
                }
                if(Object.keys(state).length == 5){
                    document.querySelector('.popup_calc_profile_button').removeAttribute('disabled');

                }

                console.log(state);
            });
        });
    }

    bindActionToElems('click', windowForm, 'form');
    bindActionToElems('input', windowHeight, 'height');
    bindActionToElems('input', windowWidth, 'width');
    bindActionToElems('change', windowType, 'type');
    bindActionToElems('change', windowProfile, 'profile');


};

export default changeModalState;