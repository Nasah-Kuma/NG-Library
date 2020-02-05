// Variable declaration
var RequestMethod = "POST";
var RequestPath = "";
var RequestAsynchronous = true;
var LoginObject;

// create user login logic
function userLogin() {
    
    var loginXmlHttpRequest;

    // collect login credentials
    var userNameFieldId = "", passwordFieldId = "";
    var userName = document.getElementById(userNameFieldId);
    var password = document.getElementById(passwordFieldId);

    // verify/check user credentials
    if (userName.length >= 3) { // check userName
       if (password.length >= 8) { // check password

            LoginObject = {"userName": userName, "password": password};
            
            // create the xmlHttpRequest Object to handle login.
            if (window.xHttpRequest) {
                loginXmlHttpRequest = new XMLHttpRequest(); 
            }else{
                loginXmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP"); // for IE% and IE6 that do not support xmlHttpRequest.
            }
            
            // response handling
            loginXmlHttpRequest.onreadystatechange = function(){
                if (loginXmlHttpRequest.readyState == 4 && loginXmlHttpRequest.state == 200) {
                    var responseJSon = loginXmlHttpRequest.responseText;
                    var responseObject = JSON.parse(responseJSon);
                    // check user login status
                    if (responseObject.status == true) {
                        // redirect the user to profile page
                    }
                    else{
                        // alert/notify user
                        alert("Failure Loging in. "+responseObject.message);
                    }
                }
            };

            // specify the request details and send the request.
            loginXmlHttpRequest.open(RequestMethod, RequestPath, RequestAsynchronous);
            loginXmlHttpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            loginXmlHttpRequest.send(JSON.stringify(LoginObject));
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
    var emailFieldId = "";
    var phoneFieldId = "";
    var userNameFieldId = "";
    var passwordFieldId = "";
    var ConfirmpasswordFieldId = "";

    var userName = document.getElementById(userNameFieldId);
    var email = document.getElementById(emailFieldId);
    var tel = document.getElementById(phoneFieldId);
    var password = document.getElementById(passwordFieldId);
    var confirmPassword = document.getElementById(ConfirmpasswordFieldId);

    // validate input

    // validate email.
    var emailPattern = "/\\w{3, }\\@\\[a-z|A-Z]{3, 45}.\\w+/i";
    if (email.length > 8) {
        if (!emailPattern.test(email)) {
            alert("Error: invalid email");
            return;
        }
    }else{
        alert("Invalid input. Email must be a atleast 8(eight) characters long");
        return;
    }


}