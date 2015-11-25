'use strict';

var SortableList = React.createClass({
  displayName: 'SortableList',

  getInitialState: function getInitialState() {
    console.log('getInitialState');
    return {
      items: [{
        id: 'a',
        position: 0,
        content: 'Adam'
      }, {
        id: 'b',
        position: 1,
        content: 'Betty'
      }, {
        id: 'c',
        position: 2,
        content: 'Charlie'
      }]
    };
  },

  componentDidMount: function componentDidMount() {
    console.log('componentDidMount');
    $(ReactDOM.findDOMNode(this)).sortable({
      items: 'li',
      update: this.handleSortableUpdate
    });
  },

  handleSortableUpdate: function handleSortableUpdate() {
    console.log('handleSorableUpdate');
    var newItems = _.clone(this.state.items, true);
    var $node = $(ReactDOM.findDOMNode(this));
    var ids = $node.sortable('toArray', { attribute: 'data-id' });

    ids.forEach(function (id, index) {
      var item = _.findWhere(newItems, { id: id });
      item.position = index;
    });

    // Lets React reorder the DOM
    $node.sortable('cancel');
    this.setState({ items: newItems });
  },

  sortedItems: function sortedItems() {
    var items = _.sortBy(this.state.items, 'position');

    return items.map(function (item) {
      return React.createElement(
        'li',
        { key: item.id, 'data-id': item.id },
        React.createElement(
          'strong',
          null,
          item.content
        ),
        React.createElement('br', null),
        'id: ',
        item.id,
        ' • position: ',
        item.position
      );
    });
  },

  render: function render() {
    console.log('render' + JSON.stringify(this.state));
    return React.createElement(
      'ul',
      null,
      this.sortedItems()
    );
  }
});

ReactDOM.render(React.createElement(SortableList, null), document.querySelector('#list'));
