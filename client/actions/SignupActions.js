var Reflux = require('reflux');
var $ = require('jquery');



SignupActions = Reflux.createActions({
  "sendSignup": {children: ['completed', 'failed']}
  });


SignupActions.sendSignup.listen(function(data) {
    $.ajax({
      url: '/api/auth/signup',
      dataType: 'json',
      method: 'POST',
      data: data

    })
      .success(this.completed)
      .error(this.failed);
});

module.exports = SignupActions;