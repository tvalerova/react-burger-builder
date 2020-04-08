import React, { Component } from 'react';

import './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

// the modal will be a component that can be wrapped around any content
class Modal extends Component {


    shouldComponentUpdate(nextProps, nextState) {
        // we only want to update the component if there is a change =  nextProps are not the same as current props
        return nextProps.show !== this.props.show;
    }
    // this is just a check for the console, to see if and when it updates
    
    // componentWillUpdate () {
    //     console.log('[Modal] WillUpdate');
    // }

    render() {
        return (
            <Aux>
                {/* if the Modal is shown, the backdrop should show too */}
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className='Modal'
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal;