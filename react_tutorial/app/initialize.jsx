// var routes = require('routes');

// document.addEventListener('DOMContentLoaded', function() {
//   ReactRouter.run(routes, ReactRouter.HashLocation, function(Root) {
//     React.render(<Root/>, document.body);
//     console.log('render');
//   });
// }, false);

// var data = [
//   { author: "Pete Hunt", text: "This is one comment." },
//   { author: "Jordan Walke", text: "This is *another* comment." }
// ];

document.addEventListener('DOMContentLoaded', function() {
  var CommentBox = React.createClass({displayName: 'CommentBox',
    loadCommentsFromServer: function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    handleCommentSubmit: function(comment) {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: comment,
        success: function(resComment) {
          var newComments = this.state.data;
          newComments.unshift(resComment);
          this.setState({data: newComments});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    getInitialState: function() {
      return {data: []};
    },
    componentDidMount: function() {
      this.loadCommentsFromServer();
      setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function() {
      return (
        <div className="commentBox">
          <h1>Comments</h1>
          <CommentList data={this.state.data} />
          <CommentForm onCommentSubmit={this.handleCommentSubmit} />
        </div>
      );
    }
  });

  var CommentList = React.createClass({
    render: function() {
      console.log(this.props.data);
      var commentNotes = this.props.data.map(function (comment) {
        return (
          <Comment author={comment.author}>
            {comment.text}
          </Comment>
        );
      });
      return (
        <div className="commentList">
          {commentNotes}
        </div>
      );
    }
  });

  var Comment = React.createClass({
    rawMarkup: function() {
      var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
      return { __html: rawMarkup };
    },

    render: function() {
      return (
        <div className="comment">
          <h2 className="commentAuthor">
            {this.props.author}
          </h2>
          <span dangerouslySetInnerHTML={this.rawMarkup()} />
        </div>
      );
    }
  })

  var CommentForm = React.createClass({
    handleSubmit: function(e) {
      e.preventDefault();
      var authorDOM = React.findDOMNode(this.refs.author);
      var textDOM   = React.findDOMNode(this.refs.text);
      var author = authorDOM.value.trim();
      var text   = textDOM.value.trim();
      if (!author || !text) {
        return;
      }
      this.props.onCommentSubmit({ author: author, text: text });
      authorDOM.value = '';
      textDOM.value   = '';
      return;
    },
    render: function() {
      return (
        <form className="commentForm" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Your name" ref="author" /><br />
          <input type="text" placeholder="Say something..." ref="text" /><br />
          <input type="submit" value="Post" />
        </form>
      );
    }
  });

  React.render(
    <CommentBox url="/api/comments" pollInterval={5000} />,
    document.getElementById('content')
  );
}, false);
