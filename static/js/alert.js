const defaultSelector = "#alerts";
class Alert{
    /**
     * 
     * @param {String} message The message to be displayed in the alert
     * @param {String} type The type of the alert {danger, warning, info}
     * @param {String} selector The selector of the alerts div
     */
    constructor(message, type, selector){
        this.message = message;
        Alert.selector = selector || Alert.selector || defaultSelector;
        console.log(Alert.selector);
        const child = document.createElement("div");
        child.classList.add("alert");
        child.classList.add("alert-" + type);
        child.innerHTML = message;
        document.querySelector(Alert.selector).appendChild(child);
    }

    static clear(){
        if(!Alert.selector)
            Alert.selector = defaultSelector;
        document.querySelector(Alert.selector).innerHTML = "";
    }
}