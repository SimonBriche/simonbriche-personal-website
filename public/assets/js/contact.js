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
      const formElements = form.elements;
      const btnSubmit = form.querySelector('.btn-submit');
      btnSubmit.disabled = true;
      btnSubmit.classList.add('pending');
      
      (async () => {
        const query = `mutation sendContactMessage($input: ContactMessageInput){
          sendContactMessage(input: $input)
        }`;
        
        const res = await (await fetch(window.CustomApp.cdnURL+'/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables: {
              input: {
                first_name: formElements.first_name.value,
                last_name: formElements.last_name.value,
                email: formElements.email.value,
                message: formElements.message.value
              }
            }
          })
        })).json();
        console.log('res', res);
        if(!res.errors){
          window.CustomApp.showNotif('Votre message a bien été envoyé.', 'success');
        }
        else{
          console.log('submit form failed', res.errors);
          window.CustomApp.showNotif(formMessages.unexpected, 'danger');
        }
        btnSubmit.disabled = false;
        btnSubmit.classList.remove('pending');
      })().catch((e) => {
        console.log('submit form failed', e);
        window.CustomApp.showNotif(formMessages.unexpected, 'danger');
        btnSubmit.disabled = false;
        btnSubmit.classList.remove('pending');
      });
    }
  };
  
  // Merge global into specific configuration
  formOptions = $.extend({}, window.CustomApp.formOptions, formOptions);
  $("#form-contact").validate(formOptions);
});