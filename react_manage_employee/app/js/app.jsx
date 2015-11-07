// employeeServiceを読み込む
require('js/data');

var Header = React.createClass({
  render: function () {
    return (
      <h1 className="title">{this.props.text}</h1>
    );
  }
});

var SearchBar = React.createClass({
  getInitialState: function() {
    return { searchKey: "" };
  },

  searchHandler: function(event) {
    var searchKey = event.target.value;
    this.setState({ searchKey: searchKey });
    this.props.searchHandler(searchKey);
  },

  // TODO why this.state.symbol insted of searchKey
  render: function () {
    return (
      <input type="search" value={this.state.symbol} onChange={this.searchHandler} />
    );
  }
});

var EmployeeList = React.createClass({
  render: function () {
    var items = this.props.employees.map(function (employee) {
      return (
        <EmployeeListItem key={employee.id} employee={employee} />
      );
    })
    return (
      <ul>
        {items}
      </ul>
    );
  }
});

var EmployeeListItem = React.createClass({
  render: function () {
    return (
      <li>
        <a href={"#employees/" + this.props.employee.id}>
          {this.props.employee.firstName} {this.props.employee.lastName}
        </a>
      </li>
    );
  }
});

/*
   HomePage
    L Header
    L SearchBar
    L EmployeeList
       L EmployeeListItem
 */
var HomePage = React.createClass({
  getInitialState: function() {
    return { employees: empoyeeService.allEmployees() };
  },

  searchHandler: function(searchKey) {
    this.props.service.findByName(searchKey).done(function(result) {
      this.setState({ searchKey: searchKey, employees: result });
    }.bind(this));
  },

  render: function () {
    return (
      <div>
        <Header text="Employee Directory"/>
        <SearchBar searchHandler={this.searchHandler}/>
        <EmployeeList employees={this.state.employees}/>
      </div>
    );
  }
});

React.render(
  <HomePage service={empoyeeService}/>,
  document.body
);


