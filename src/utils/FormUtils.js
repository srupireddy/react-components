export default class FormUtils {
    static submitFormAfterAppendingModel(form, model) {
        this.addFormElements(form, model);
        form.submit();
    }

    static addFormElements(form, model) {
        Object.getOwnPropertyNames(model).forEach(function(key) {
            //TODO: There is nothing like SlideConfigs. 
            var modelPath = slideConfigs[key].mapping;
            var value = model[key];
            var element = this.createElement(modelPath, value);
            form.appendChild(element);
        });
    }

    static addElementToForm(name, value) {
        var inputElement = document.createElement("input");
        inputElement.setAttribute("type", "hidden");
        inputElement.setAttribute("name", name);
        inputElement.setAttribute("value", value);
        return inputElement;
    }    
}