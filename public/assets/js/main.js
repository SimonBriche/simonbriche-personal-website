//custom code that needs to be execited on each page
document.addEventListener('DOMContentLoaded', function() {
  var modalProfile = new bootstrap.Modal(document.getElementById('modal-profile'), {
    keyboard: false,
    backdrop: false
  });

  document.querySelector('#btn-profile').addEventListener('click', () => {
    document.querySelectorAll('.footer-interface').forEach(item => item.classList.toggle('open'));
    modalProfile.show();
  }, false);
  document.querySelector('#btn-close-footer').addEventListener('click', () => {
    document.querySelectorAll('.footer-interface').forEach(item => item.classList.toggle('open'));
    document.querySelectorAll('.modal-interface').forEach(item => bootstrap.Modal.getInstance(item).hide())
  }, false);
});

//global configuration
window.CustomApp = {
  cdnURL: window.__CDN_URL
};
window.CustomApp.formMessages = {
  unexpected: "Une erreur inconnue est survenue",
  last_name: "Votre nom est obligatoire.",
  first_name: "Votre prénom est obligatoire.",
  email: {
    required: "Votre email est obligatoire.",
    email: "Votre email est incorrect."
  },
  message: "Votre message est obligatoire."
};
window.CustomApp.formOptions = {
  debug: false,
  rules: {},
  messages: {},
  submitHandler: function (form) {
    console.log('default submitHandler');
  },
  invalidHandler: function(event, validator) {
    // 'this' refers to the form
    const errors = validator.numberOfInvalids();
    if(errors) {
      window.CustomApp.showNotif('Il y a <strong>'+errors+' erreur'+((errors > 1) ? "s":"")+"</strong> à corriger dans le formulaire.", 'danger');
    }
  },
  errorClass: 'is-invalid',
  validClass: 'is-valid',
  ignore: "",
  highlight: function (element, errorClass, validClass) {
    $(element).removeClass(validClass).addClass(errorClass);
    $(element).closest('.form-group').removeClass(validClass).addClass(errorClass);
  },
  unhighlight: function (element, errorClass, validClass) {
    $(element).removeClass(errorClass).addClass(validClass);
    $(element).closest('.form-group').removeClass(errorClass).addClass(validClass).find('.form-text').text('');
  },
  errorPlacement: function (error, element) {
    $(element).closest('.form-group').find('.form-text').text(error.text());
  }
};
//show a notification
window.CustomApp.showNotif = function(message, context, delay, reloadPage){
  let notif, autoHide;
  //autoHide false if there is no delay
  if(delay === false){
    autoHide = false;
    delay = 2000;
  }
  else{
    autoHide = true;
    //delay defaults to 2500ms
    delay = (isNaN(delay) ? 2500 : delay);
  }
  
  //if message is a string or an object like {description:"description", title:"title"}, generate notif from template
  if(message && (typeof message === 'string' || (message.description || message.title))){
    notif = document.getElementById("notification-template").cloneNode(true);
    notif.id = '';
    
    if(context){
      let headerClassList = notif.querySelector('.toast-header').classList;
      headerClassList.add('text-white', 'bg-'+context);
      if(context === "warning" || context === "light" || context === "white"){
        headerClassList.replace('text-white', 'text-dark')
      }
    }
    if(autoHide){
      notif.querySelector('.btn-close').remove();
    }
    if(message.description){
      notif.querySelector('.toast-body').innerHTML = message.description;
    }
    else{
      notif.querySelector('.toast-body').innerHTML = message;
    }
    if(message.title){
      notif.querySelector('.title').innerHTML = message.title;
    }
  }
  //if message is a jQuery object, clone it to generate the notif
  else if(typeof message === "Element"){
    notif = $(message).cloneNode(true);
    notif.id = '';
  }

  if(notif){
    document.getElementById("notifications-container").appendChild(notif);
    const toast = new bootstrap.Toast(notif, {autohide: autoHide, delay: delay});
    notif.addEventListener('hidden.bs.toast', function () {
      this.remove();
      if(reloadPage){
        document.location = document.location;
      }
    });
    if(autoHide === true){
      notif.querySelector('.toast-progress').style = `animation-duration:${delay}ms;`;
    }
    else{
      notif.querySelector('.toast-progress').style = "display:none;";
    }
    toast.show();
  }
  else{
    console.log('notif message is not a string nor a Element object');
  }
}