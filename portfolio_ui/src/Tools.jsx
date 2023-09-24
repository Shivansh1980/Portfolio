import React from 'react'
import ReactDOM from 'react-dom'
import withCrossIcon from './components/higher-order-components/withCrossIcon';

export default class Tools {

    displayComponent(component, insertAt="body"){
        var parentElement;
        if(insertAt === "body") {
            parentElement = document.body;
        }
        else {
            var el = document.getElementById(insertAt);
            if(el) parentElement = el;
            else throw "no element with the given id found > displayComponent"
        }
        parentElement.classList.add("display_popup_container")
        
        const clonedComponent = React.cloneElement(component, {
            ...component.props,
            isPopup: true,
            close:() => {
                ReactDOM.unmountComponentAtNode(parentElement);
                parentElement.remove();
            },
            destroyComponent: () => {
                ReactDOM.unmountComponentAtNode(parentElement);
                parentElement.remove();
            },
        });
        ReactDOM.render(clonedComponent, parentElement);
        return parentElement;
    }

}