import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
// import '@okta/okta-signin-widget/dist/css/okta-theme.css';

export default class OktaSignInWidget extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const el = ReactDOM.findDOMNode(this);
        this.widget = new OktaSignIn({
            baseUrl: this.props.baseUrl,
            el,
            authParams: {
                pkce: true,
                issuer: `${this.props.baseUrl}/oauth2/default`,
                display: 'page',
            },
        });

        this.widget.renderEl(
            { el },

            async function success(res) {
                console.log(res);
                if (res.status === 'SUCCESS') {
                    console.log(this.props.authProp);
                    await this.props.auth.handleAuthentication();
                    const accessToken = await this.props.auth.getAccessToken();
                    console.log(accessToken);
                    return this.props.auth.redirect({
                        sessionToken: res.session.token,
                    });
                }
            },

            function error(err) {
                console.log('error logging in', err);
            },
        );
    }

    componentWillUnmount() {
        this.widget.remove();
    }

    render() {
        return <div />;
    }
}
