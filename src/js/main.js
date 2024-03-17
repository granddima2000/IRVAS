import "./slider";
import modals from './modules/modals'
import tabs from "./modules/tabs";

window.addEventListener('DOMContentLoaded', () => { // Отвечает за то, что наши скрипты начинают выполняться только тогда, когда DOM структура на нашей страницы вообще готова
    modals();
    tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active');
    tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click')
});