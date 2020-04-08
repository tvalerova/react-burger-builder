import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';


const withErrorHandler = (WrappedComponent) => {
    return (props) => {
        return (
            <Aux>
                <Modal>
                    Something did not work!
                </Modal>
                {/* I want to return the wrappedcomponent and distribute any props this component might receive */}
                <WrappedComponent {...props} />
            </Aux>
        );
    }
}

export default withErrorHandler;