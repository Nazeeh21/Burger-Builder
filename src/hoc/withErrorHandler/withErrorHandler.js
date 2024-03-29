import React, { Component } from 'react';
import Aux from '../Auxilliary/Auxilliiary';
import Modal from '../../UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        }
        
        componentWillMount() {
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })
            this.resInterceptors = axios.interceptors.response.use(response => response, error => {
                this.setState({error: error});
            })
        }

        componentWillUnmount() {
            // console.log('Will Unmount', this.reqInterceptors, this.resInterceptors);
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }
   
        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render() {
            return (
                <Aux>
                <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props} />
            </Aux>
            )
        }
    }
}

export default withErrorHandler;