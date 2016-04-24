import React from 'react';
import Reflux from 'reflux';

function ListenerMixin(ComposedComponent) {
    return React.createClass({
        mixins: [Reflux.ListenerMixin],

        getInitialState() {
          return {order: 0}
        },

        componentWillMount() {
          this.setState({order: this.props.componentId});
        },

        render() {
            return <ComposedComponent {...this.props} setOuterState={this.setOuterState} listenTo={this.listenTo}/>;
        }

    });
}

export default ListenerMixin;