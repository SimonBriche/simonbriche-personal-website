document.addEventListener('DOMContentLoaded', function() {  
  // Set custom messages for this form
  let formMessages = {};
  //add the default messages to the custom ones
  formMessages = $.extend({}, window.CustomApp.formMessages, formMessages);
  
  let formOptions = {
    rules: {
      last_name: {
        minlength: 2,
        required: true
      },
      email: {
        required: true,
        email: true
      },
      message:{
        minlength: 2,
        required: true,
      }
    },
    messages:formMessages,
    submitHandler: function (form) {
      $('.btn-submit', form).prop('disabled', 'disabled');
      $('.btn-submit', form).addClass('pending');
      
      $.post("/api/register", $(form).serialize(), null, "json")
      .done(function(data) {
        console.log("done");
        console.log(data);
        if(data.success === true){
          window.CustomApp.showNotif('Le user a bien été créé.', 'success');
        }
        else{
          if(formMessages[data.error]){
            window.CustomApp.showNotif(formMessages[data.error], 'danger',false);
          }
          else{
            window.CustomApp.setError(formMessages.unexpected, 'danger',false);
          }
        }
      })
      .fail(function() {
        window.CustomApp.setError(formMessages.unexpected, 'danger',false);
      })
      .always(function() {
        $('.btn-submit', form).prop('disabled', false);
        $('.btn-submit', form).removeClass('pending');
      });
    }
  };
  
  // Merge global into specific configuration
  formOptions = $.extend({}, window.CustomApp.formOptions, formOptions);
  $("#form-contact").validate(formOptions);
});