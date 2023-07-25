import React from 'react'
import ReactDOM from 'react-dom'
import withCrossIcon from './components/higher-order-components/withCrossIcon';

export default class Tools {

    displayComponent(component, insertAt="body"){
        var parentElement;
        if(insertAt === "body") parentElement = document.body;
        else {
            var el = document.getElementById(insertAt);
            if(el) parentElement = el;
            else throw "no element with the given id found > displayComponent"
        }

        var newDiv = document.createElement('div');
        newDiv.className = "display_popup_container"
        parentElement.classList.add('position_relative');
        parentElement.appendChild(newDiv);
        
        const clonedComponent = React.cloneElement(component, {
            ...component.props,
            isPopup: true,
            close:() => {
                ReactDOM.unmountComponentAtNode(newDiv);
                parentElement.classList.remove('position_relative');
                newDiv.remove();
            },
            destroyComponent: () => {
                ReactDOM.unmountComponentAtNode(newDiv);
                parentElement.classList.remove('position_relative');
                newDiv.remove();
            },
        });
        ReactDOM.render(clonedComponent, newDiv);
        return newDiv;
    }
}