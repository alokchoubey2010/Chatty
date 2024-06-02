function activateSignup(){
  topBg = document.querySelector(".topBg");
  createBtn = document.querySelector(".create");
  loginForm = document.querySelector(".formBoxlogin");
  signupForm = document.querySelector(".formBoxsignup");
  loginForm.classList.add("expand");
  setTimeout(function(){
    loginForm.innerHTML = "";
    loginForm.style.padding = "0";
    loginForm.style.borderRadius = "50px";
    createBtn.classList.add("remove");
    signupForm.style.marginTop = '33px';
    setTimeout(function(){
      createBtn.style.display = 'none';
    },700);
    loginForm.innerHTML = "<Button class='continue' onclick='activateLogin()'>Login To Account</Button>"
  },1000);
  topBg.style.height = '100px';
}


function activateLogin(){
  topBg = document.querySelector(".topBg");
  createBtn = document.querySelector(".create");
  loginForm = document.querySelector(".formBoxlogin");
  signupForm = document.querySelector(".formBoxsignup");
  loginForm.classList.remove("expand");
  setTimeout(function(){
    loginForm.innerHTML = "";
    loginForm.style.padding = "20px";
    loginForm.style.borderRadius = "15px";
    createBtn.classList.remove("remove");
    signupForm.style.marginTop = '700px';
    setTimeout(function(){
      createBtn.style.display = 'block';
    },700);
    loginForm.innerHTML ="<h2>Chatty - Login</h2><input type='email' placeholder='Email'id='email'><input type='password' placeholder='Password'id='password'><label for='password'><a class='forgotPassword'href='#'>Forgot Password?</a></label><br><input type='checkbox' name='loggedIn' id='loggedIn' /><label for='loggedIn'><span>Remember Me</span></label><br><button class='login' onclick='login()'>Let me In</button><span>Not a User ? <a href='#' onclick='activateSignup()'>Become One</a></span>";
  },100);
  topBg.style.height = '75vh';
}