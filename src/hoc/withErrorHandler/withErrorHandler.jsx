import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    // we will change this component from functional to class based, so we can use a lifecycle hook here and axios interceptors
    // this is an anonymous class because we never use that class, it's a class factory - withErrorHandler creates these classes
    return class extends Component {
        state = {
            error: null
        }

        componentDidMount () {
            // when we send a request, we clear any errors we might have
            axios.interceptors.request.use(req => {
                this.setState({error: null});
            })
            // if we get an error we want to display an error
            axios.interceptors.response.use(null, error => {
                this.setState({error: error});
            })
        }

        render() {
            return (
                <Aux>
                    {/* we will only show the modal if there is an error */}
                    <Modal show={this.state.error}>
                        {/* there is a message property on the error object returned by Firebase */}
                        {this.state.error.message}
                    </Modal>
                    {/* I want to return the wrappedcomponent and distribute any props this component might receive */}
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }    
}

export default withErrorHandler;