//password validation 
function myfun() {
   var a = document.getElementById("paswd").value;
   var b = document.getElementById("confpass").value;

   var fromValidation = true;

   if (a == "") {
      alert("password are not empty")
      fromValidation = false
      return false;
   }
   if (a.length < 8) {
      alert("password length must be greater than 8 characters")
      fromValidation = false
      return false;
   }
   if (a.length > 15) {
      alert("password length should not be greater than 15 characters")
      fromValidation = false
      return false;
   }
   if (a != b) {
      alert("password did not match")
      fromValidation = false
      return false;
   }
   if (fromValidation) {
      myfunction()
   }
}

function myfunction() {

   var name = document.getElementById("fname").value;
   var email = document.getElementById("email").value;
   var password = document.getElementById("paswd").value;
   axios({
      method: 'post',
      url: '/api/signup',
      data: {
         name: name,
         email: email,
         password: password
      }
   }).then((result) => {
      alert(result.data.message);
   }).catch((err) => {
      alert("usesr already exist")
   });
}

$(document).ready(function () {
   $('#up').on('submit', function (e) {
      e.preventDefault()
      myfun()
   })
});

function submitForm() {
   $('form[name="SignupForm"]').submit();
   $('input[type="text"], textarea').val('');
   $('input[type="email"], textarea').val('');
   $('input[type="password"], textarea').val('');
}

//signin 

function signin() {
   var email = document.getElementById("logemail").value;
   var password = document.getElementById("logpass").value;

   axios({
      method: 'post',
      url: '/api/signin',
      data: {
         email: email,
         password: password
      },


   }).then((result) => {
      alert(result.data.message);
      if (result.data.success) {
         localStorage.setItem('token', result.data.token);
         document.cookie = `token=${result.data.token};max-age=2 ;path=/password`
         location.replace('/password');

      }
   }).catch((err) => {
      console.log(err);
      alert('Something went wrong. Please try again!');
   });
}

$(document).ready(function () {
   $('#in').on('submit', function (e) {
      e.preventDefault()
      signin()
   });
});


//password
function password() {
   var NewPass = document.getElementById("newpaswd").value
   var ConPass = document.getElementById("confpaswd").value

   var fromValidation = true;

   if (NewPass == null) {
      alert("password are not empty");
      return false;
   }
   if (NewPass.length < 8) {
      alert("password length must be greater than 8 characters")
      return false;
   }
   if (NewPass.length > 15) {
      alert("password length should not be greater than 15 characters")
      return false;
   }
   if (NewPass != ConPass) {
      alert("password did not match")
      return false;
   }
   if (fromValidation) {
      passfunction()
   }
}

function passfunction() {
   var oldpassword = document.getElementById("oldpaswd").value;
   var newpassword = document.getElementById("newpaswd").value;

   axios({
      method: 'post',
      url: '/api/password',
      data: {
         oldPassword: oldpassword,
         newPassword: newpassword
      },
      headers: {
         authorization: localStorage.getItem('token')
      }
   }).then((response) => {
      alert(response.data.message);
      location.replace('/home');
   }).catch((err) => {
      alert('Something went wrong. Please try again!');
   });
}

$(document).ready(function () {
   $('#pass').on('submit', function (e) {
      e.preventDefault()
      password()
   })
});
