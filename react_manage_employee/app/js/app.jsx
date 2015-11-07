var router = (function () {
    var routes = [];
    function addRoute(route, handler) {

        routes.push({parts: route.split('/'), handler: handler});
    }
    function load(route) {
        window.location.hash = route;
    }
    function start() {

        var path = window.location.hash.substr(1),
            parts = path.split('/'),
            partsLength = parts.length;

        for (var i = 0; i < routes.length; i++) {
            var route = routes[i];
            if (route.parts.length === partsLength) {
                var params = [];
                for (var j = 0; j < partsLength; j++) {
                    if (route.parts[j].substr(0, 1) === ':') {
                        params.push(parts[j]);
                    } else if (route.parts[j] !== parts[j]) {
                        break;
                    }
                }
                if (j === partsLength) {
                    route.handler.apply(undefined, params);
                    return;
                }
            }
        }
    }

    window.onhashchange = start;

    return {
        addRoute: addRoute,
        load: load,
        start: start
    };
}());

var employeeService = (function() {
  var findById = function(id) {
      var deferred = $.Deferred();
      var employee = null;
      var len = employees.length;
      for (var i = 0; i < len; i++) {
        if (employees[i].id == id) {
          employee = employees[i];
          break;
        }
      }
      deferred.resolve(employee);
      return deferred.promise();
    },

    findByName = function(searchKey) {
      var deferred = $.Deferred();
      var results = employees.filter(function(employee) {
        var fullName = employee.firstName + " " + employee.lastName;
        return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
      });
      deferred.resolve(results);
      return deferred.promise();
    },

    findByManager = function(managerId) {
      var deferred = $.Deferred();
      var results = employees.filter(function(employee) {
        return managerId === employee.managerId;
      });
      deferred.resolve(results);
      return deferred.promise();
    },

    allEmployees = function() {
      return employees;
    },

    // データ
    employees = [
      {"id": 1, "firstName": "James", "lastName": "King", "managerId": 0, "managerName": "", "reports": 4, "title": "President and CEO", "department": "Corporate", "mobilePhone": "617-000-0001", "officePhone": "781-000-0001", "email": "jking@fakemail.com", "city": "Boston, MA", "pic": "james_king.jpg", "twitterId": "@fakejking", "blog": "http://coenraets.org"},
      {"id": 2, "firstName": "Julie", "lastName": "Taylor", "managerId": 1, "managerName": "James King", "reports": 2, "title": "VP of Marketing", "department": "Marketing", "mobilePhone": "617-000-0002", "officePhone": "781-000-0002", "email": "jtaylor@fakemail.com", "city": "Boston, MA", "pic": "julie_taylor.jpg", "twitterId": "@fakejtaylor", "blog": "http://coenraets.org"},
      {"id": 3, "firstName": "Eugene", "lastName": "Lee", "managerId": 1, "managerName": "James King", "reports": 0, "title": "CFO", "department": "Accounting", "mobilePhone": "617-000-0003", "officePhone": "781-000-0003", "email": "elee@fakemail.com", "city": "Boston, MA", "pic": "eugene_lee.jpg", "twitterId": "@fakeelee", "blog": "http://coenraets.org"},
      {"id": 4, "firstName": "John", "lastName": "Williams", "managerId": 1, "managerName": "James King", "reports": 3, "title": "VP of Engineering", "department": "Engineering", "mobilePhone": "617-000-0004", "officePhone": "781-000-0004", "email": "jwilliams@fakemail.com", "city": "Boston, MA", "pic": "john_williams.jpg", "twitterId": "@fakejwilliams", "blog": "http://coenraets.org"},
      {"id": 5, "firstName": "Ray", "lastName": "Moore", "managerId": 1, "managerName": "James King", "reports": 2, "title": "VP of Sales", "department": "Sales", "mobilePhone": "617-000-0005", "officePhone": "781-000-0005", "email": "rmoore@fakemail.com", "city": "Boston, MA", "pic": "ray_moore.jpg", "twitterId": "@fakermoore", "blog": "http://coenraets.org"},
      {"id": 6, "firstName": "Paul", "lastName": "Jones", "managerId": 4, "managerName": "John Williams", "reports": 0, "title": "QA Manager", "department": "Engineering", "mobilePhone": "617-000-0006", "officePhone": "781-000-0006", "email": "pjones@fakemail.com", "city": "Boston, MA", "pic": "paul_jones.jpg", "twitterId": "@fakepjones", "blog": "http://coenraets.org"},
      {"id": 7, "firstName": "Paula", "lastName": "Gates", "managerId": 4, "managerName": "John Williams", "reports": 0, "title": "Software Architect", "department": "Engineering", "mobilePhone": "617-000-0007", "officePhone": "781-000-0007", "email": "pgates@fakemail.com", "city": "Boston, MA", "pic": "paula_gates.jpg", "twitterId": "@fakepgates", "blog": "http://coenraets.org"},
      {"id": 8, "firstName": "Lisa", "lastName": "Wong", "managerId": 2, "managerName": "Julie Taylor", "reports": 0, "title": "Marketing Manager", "department": "Marketing", "mobilePhone": "617-000-0008", "officePhone": "781-000-0008", "email": "lwong@fakemail.com", "city": "Boston, MA", "pic": "lisa_wong.jpg", "twitterId": "@fakelwong", "blog": "http://coenraets.org"},
      {"id": 9, "firstName": "Gary", "lastName": "Donovan", "managerId": 2, "managerName": "Julie Taylor", "reports": 0, "title": "Marketing Manager", "department": "Marketing", "mobilePhone": "617-000-0009", "officePhone": "781-000-0009", "email": "gdonovan@fakemail.com", "city": "Boston, MA", "pic": "gary_donovan.jpg", "twitterId": "@fakegdonovan", "blog": "http://coenraets.org"},
      {"id": 10, "firstName": "Kathleen", "lastName": "Byrne", "managerId": 5, "managerName": "Ray Moore", "reports": 0, "title": "Sales Representative", "department": "Sales", "mobilePhone": "617-000-0010", "officePhone": "781-000-0010", "email": "kbyrne@fakemail.com", "city": "Boston, MA", "pic": "kathleen_byrne.jpg", "twitterId": "@fakekbyrne", "blog": "http://coenraets.org"},
      {"id": 11, "firstName": "Amy", "lastName": "Jones", "managerId": 5, "managerName": "Ray Moore", "reports": 0, "title": "Sales Representative", "department": "Sales", "mobilePhone": "617-000-0011", "officePhone": "781-000-0011", "email": "ajones@fakemail.com", "city": "Boston, MA", "pic": "amy_jones.jpg", "twitterId": "@fakeajones", "blog": "http://coenraets.org"},
      {"id": 12, "firstName": "Steven", "lastName": "Wells", "managerId": 4, "managerName": "John Williams", "reports": 0, "title": "Software Architect", "department": "Engineering", "mobilePhone": "617-000-0012", "officePhone": "781-000-0012", "email": "swells@fakemail.com", "city": "Boston, MA", "pic": "steven_wells.jpg", "twitterId": "@fakeswells", "blog": "http://coenraets.org"}
    ];

    // The Public API
    return {
      findById: findById,
      findByName: findByName,
      findByManager: findByManager,
      allEmployees: allEmployees
    };
}());

var Header = React.createClass({
  render: function () {
    return (
      <header className="bar bar-nav">
        <a href="#" className={"icon icon-left-nav pull-left" + (this.props.back==="true" ? "": " hidden")}></a>
        <h1 className="title">{this.props.text}</h1>
      </header>
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
      <div className="bar bar-standard bar-header-secondary">
        <input type="search" value={this.state.symbol} onChange={this.searchHandler} />
      </div>
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
      <ul className="table-view">
        {items}
      </ul>
    );
  }
});

var EmployeeListItem = React.createClass({
  render: function () {
    return (
      <li className="table-view-cell media">
        <a href={"#employees/" + this.props.employee.id}>
          <img className="media-object small pull-left" src={"pics/" + this.props.employee.firstName + "_" + this.props.employee.lastName + ".jpg"}/>
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

   ページ遷移
    ↓
  EmployeePage

 */
var HomePage = React.createClass({
  getInitialState: function() {
    return { employees: employeeService.allEmployees() };
  },

  searchHandler: function(searchKey) {
    this.props.service.findByName(searchKey).done(function(result) {
      this.setState({ searchKey: searchKey, employees: result });
    }.bind(this));
  },

  render: function () {
    return (
      <div>
        <Header text="Employee Directory" back="false"/>
        <SearchBar searchHandler={this.searchHandler}/>
        <div className="content">
          <EmployeeList employees={this.state.employees}/>
        </div>
      </div>
    );
  }
});


var EmployeePage = React.createClass({
  getInitialState: function() {
    return {employee: {}};
  },
  componentDidMount: function() {
    this.props.service.findById(this.props.employeeId).done(function(result) {
      this.setState({employee: result});
    }.bind(this));
  },
  render: function () {
    return (
      <div>
        <Header text="Employee" back="true"/>
        <div className="card">
          <ul className="table-view">
            <li className="table-view-cell media">
              <img className="media-object big pull-left" src={"pics/" + this.state.employee.firstName + "_" + this.state.employee.lastName + ".jpg" }/>
              <h1>{this.state.employee.firstName} {this.state.employee.lastName}</h1>
              <p>{this.state.employee.title}</p>
            </li>
            <li className="table-view-cell media">
              <a href={"tel:" + this.state.employee.officePhone} className="push-right">
                <span className="media-object pull-left icon icon-call"></span>
                <div className="media-body">
                Call Office
                  <p>{this.state.employee.officePhone}</p>
                </div>
              </a>
            </li>
            <li className="table-view-cell media">
              <a href={"tel:" + this.state.employee.mobilePhone} className="push-right">
                <span className="media-object pull-left icon icon-call"></span>
                <div className="media-body">
                Call Mobile
                  <p>{this.state.employee.mobilePhone}</p>
                </div>
              </a>
            </li>
            <li className="table-view-cell media">
              <a href={"sms:" + this.state.employee.mobilePhone} className="push-right">
                <span className="media-object pull-left icon icon-sms"></span>
                <div className="media-body">
                SMS
                  <p>{this.state.employee.mobilePhone}</p>
                </div>
              </a>
            </li>
            <li className="table-view-cell media">
              <a href={"mailto:" + this.state.employee.email} className="push-right">
                <span className="media-object pull-left icon icon-email"></span>
                <div className="media-body">
                Email
                  <p>{this.state.employee.email}</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});

router.addRoute('', function() {
  React.render(
    <HomePage service={employeeService}/>,
    document.body
  );
});

router.addRoute('employees/:id', function(id) {
  React.render(
    <EmployeePage employeeId={id} service={employeeService}/>,
    document.body
  );
});
router.start();
