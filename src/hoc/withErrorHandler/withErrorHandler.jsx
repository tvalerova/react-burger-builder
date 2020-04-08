import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

// the problem is that if we add this hoc with error handler to other components
// we will call componentWillMount again and again - it is called everytime withErrorHandler is wrapped around a component
// we should therefore remove the interceptors after the component unmounts

const withErrorHandler = (WrappedComponent, axios) => {
    // we will change this component from functional to class based, so we can use a lifecycle hook here and axios interceptors
    // this is an anonymous class because we never use that class, it's a class factory - withErrorHandler creates these classes
    return class extends Component {
        state = {
            error: null
        }

        // this will be called before the children components are rendered
        // we are not causing side effects, we are just reigstering the interceptors
        componentWillMount() {
            // when we send a request, we clear any errors we might have
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            })
            // if we get an error we want to display an error
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            })
        }

        // this will remove the interceptors when the component unmounts - goog for memory optimization
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <Aux>
                    {/* we will only show the modal if there is an error */}
                    <Modal
                        show={this.state.error}
                        // the modal component exposes the clicked property - when we click the backdrop
                        // when we click the backdrop, we want to clear the error
                        modalClosed={this.errorConfirmedHandler}>
                        {/* there is a message property on the error object returned by Firebase */}
                        {/* the modal component is always present, even if we sometimes don't show it 
                        we add a ternary expression; we will only output it if it is not null */}
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    {/* I want to return the wrappedcomponent and distribute any props this component might receive */}
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;