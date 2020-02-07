// Variable declaration
var RequestMethod = "POST";
var RequestPath = "http://192.168.43.14:7500/nglibrary/api/user/login";
var RequestAsynchronous = true;
var userInputObject;
var signupXmlHttpRequest;

// create user login logic
function userLogin() {
    
    var loginXmlHttpRequest;
    

    // collect login credentials
    var userNameFieldId = "userNameField", passwordFieldId = "passwordField";
    var userName = document.getElementById(userNameFieldId).value;
    var password = document.getElementById(passwordFieldId).value;

    // verify/check user credentials
    console.log(userName);
    if (userName.length >= 3) { // check userName
       if (password.length >= 8) { // check password

            
            
            // create the xmlHttpRequest Object to handle login.
            
                loginXmlHttpRequest = new XMLHttpRequest();
            
            // response handling
            loginXmlHttpRequest.onreadystatechange = function(){
                switch (this.status) {
                    case 200:
                        if (this.readyState == 4 && this.status == 200) {
                    var responseJSon = this.responseText;
                    var responseObject = JSON.parse(responseJSon);
                   
                   
                    // check user login status                    
                    if (responseObject.success == true) {
                        // log user in and redirect the user to profile page
                        localStorage.setItem('loginResponse',JSON.stringify(this.responseText));
                        console.log(this.responseText);
                        window.location = "../BookModule/userDashboard.html";
                    }
                    else{
                        // alert/notify user
                        alert("Failure Loging in. "+responseObject.message);
                        return;
                    }
                }
                        break;
                    case 400:
                        alert(JSON.parse(this.responseText).message);
                        break;
                }
                
            };

            // specify the request details and send the request.
            loginXmlHttpRequest.open(RequestMethod, RequestPath, RequestAsynchronous);
            loginXmlHttpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            loginXmlHttpRequest.send(`userName=${userName}&password=${password}`);
        }
        else{
            alert("Password too short. Password must be minimum 8(eight) characters");
        return; // exit function; wrong invalid password
        }
    }
    else{
         alert("Username too short. Username must be atleast 3(three) characters long");
       return; //exit function; wrong userName
    }
}

// signup input validating and submission
function userSignUp() {
    // input field Ids
    var emailFieldId = "emailField";
    var phoneFieldId = "phoneField";
    var userNameFieldId = "userNameField2";
    var passwordFieldId = "passwordField2";
    var ConfirmpasswordFieldId = "confirmPasswordField";

    var email = document.getElementById(emailFieldId).value;
    var tel = document.getElementById(phoneFieldId).value;
    var userName = document.querySelector("#"+userNameFieldId).value;
    // var userName = userNode.value;
    var password = document.getElementById(passwordFieldId).value;
    var confirmPassword = document.getElementById(ConfirmpasswordFieldId).value;

    console.log(userName);
    console.log(email);
    console.log(tel);
    
    // validate input
    
    // validate email.
    var emailPattern =  new RegExp("\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})");

    if (email.length >= 8) {
        if (!emailPattern.test(email)) {
            alert("Error: invalid email");
            return;
        }
    }else{
        alert("Invalid input. Email must be a atleast 8(eight) characters long");
        return;
    }

    // validate username
    if (userName.length >= 3) {
        
    }else{
        alert("Invalid input: User name must be atleast 3(three) characters");
        return;
    }
    // validate phone number
    if (tel.length >= 7) {
        
    }else{
        alert("Invalid telephone number: Phone number must be atleas 7(seven) characters.");
        return;
    }
    // validate password
    if (password.length >= 8) {
        if (confirmPassword.length >= 8) {
            if (password != confirmPassword) {
                alert("Error: Passwords do not match. Re-enter the password in the confirmation field.");
                return;
            }
        }else{
            alert("Invalid input: password must be atleast 8(eight) characters long");
            return;
        }
    }
    else{
        alert("Invalid input: password must be atleast 8(eight) characters long");
        return;
    }
    
    
    // validation complete

    // set user inputs object


    // ACCOUNT CREATION
    if(window.XMLHttpRequest){
        signupXmlHttpRequest = new XMLHttpRequest();
    }else{
        signupXmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    signupXmlHttpRequest.onreadystatechange = function(){
        console.log(this.responseText);
        switch (this.status) {
            case 200:
                if (this.readyState == 4) {
                    var responseObject = JSON.parse(this.responseText);
                    console.log(this.responseText);
                    console.log(responseObject);
                    
                    if (responseObject.success == true) {
                        // LOG USER IN AND REDIRECT USER TO PROFILE PAGE
                       
                        
                        // save user details
                        // localStorage.setItem("userName", responseObject.user.userName);
                        // localStorage.setItem("email", responseObject.user.email);
                        // localStorage.setItem("phone", responseObject.user.phone);
                        // localStorage.setItem("id", responseObject.user.id);
        
                        localStorage.setItem('signupResponse',JSON.stringify(this.responseText));
                        window.location = "../BookModule/userDashboard.html";
                    }
                    else{
                        alert("Account creation failed: "+responseObject.messsage);
                        return;
                    }
                }
                break;

            case 400:
                alert(JSON.parse(this.responseText).message);
                break;

        }
  
    };
    signupXmlHttpRequest.open(RequestMethod, "http://192.168.43.14:7500/nglibrary/api/user/register" , RequestAsynchronous);
    signupXmlHttpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    signupXmlHttpRequest.send(`email=${email}&phone=${tel}&userName=${userName}&password=${password}`);

}