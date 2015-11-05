exports.config =
  # See http://brunch.io for docs.
  files:
    javascripts:
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^(?!app)/
    stylesheets:
      joinTo: 'stylesheets/app.css'
    templates:
      joinTo: 'javascripts/app.js'
  plugins:
    babel:
      ignore: [
          /^(bower_components|vendor)/
      ]
      pattern: /\.(es6|jsx)$/
