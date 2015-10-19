var $ = require('jquery');

  var api = {

    sendLogin: function(data) {

      $.ajax({
          url: '/api/auth/login',
          dataType: 'json',
          method: 'POST',
          data: data,
          success: function(data) {
            console.log('success')
            location.hash='/';
          },
          error: function(error) {
            console.log('error', this.state);

          }

        })
      }
    }  

  module.exports = api;