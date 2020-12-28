
                //Verify VAriables

var signInEmail = document.getElementById("email");
var signInPassword = document.getElementById("password");
var signUpName = document.getElementById("userName");
var signUpEmail = document.getElementById("signEmail");
var signUpPassword = document.getElementById("signPass");

var accountants;

                // if there is user account print hello

var userNameStored = localStorage.getItem("recordUsername");
if(userNameStored)
{
    document.getElementById("username").innerHTML="Welcome " + userNameStored;
}

                //Request if there is Data Before

if (localStorage.getItem("accountantsLoged") == null)
{
    accountants = [];
    
}
else
{
    accountants = JSON.parse(localStorage.getItem("accountantsLoged"));
}

                //Request if there is user account
function hasAccount()
{
    if(localStorage.getItem("accountantsLoged") == null)
    {
        return false;
    }
}
                //ADD New Account

function addAccount()
{
    if(isEmpty() == false)
    {
        document.getElementById("reqInp").innerHTML = `<p class="text-center text-danger">All inputs is required</p>`;
        return false ;
    }
    var Account =
    {
        name : signUpName.value,
        email : signUpEmail.value,
        password : signUpPassword.value,
    }
    if(accountants.length == 0)
    {
        accountants.push(Account);
        localStorage.setItem("accountantsLoged",JSON.stringify(accountants));
        document.getElementById("reqInp").innerHTML = `<p class="text-center text-success">Success</p>`;
        return true;
    }
    if (isEmailExist() == false)
    {
        document.getElementById("reqInp").innerHTML = `<p class="text-center text-danger">Email Already Exist</p>`;
    }
    else
    {
        accountants.push(Account);
        localStorage.setItem('accountantsLoged' , JSON.stringify(accountants));
        document.getElementById('reqInp').innerHTML=`<span class="text-success m-3">sucsess</span>`;
    }
    clearform();
}


function isEmailExist()
{
    for(var i=0 ; i<accountants.length ; i++)
    {
        if(accountants[i].email.toLowerCase() == signUpEmail.value.toLowerCase())
        {
            return false;
        }
    }
}

function isEmpty()
{
    if (signUpName.value=="" || signUpEmail.value=="" ||signUpPassword.value=="")
    {
        return false;
    }
    else
    {
        return true;
    }
}

function logIn()
{
    if(hasAccount() == false)
    {
        document.getElementById("incorrect").innerHTML = `<p class="text-center text-danger">You Don't have account please sign up</p>`;
        return false;
    }
    if(isLogInEmpty() == false)
    {
        document.getElementById("incorrect").innerHTML = `<p class="text-center text-danger">You Don't have account please sign up</p>`;
        return false;
    }

    var password = signInPassword.value;
    var email = signInEmail.value;
    for(var i= 0 ; i< accountants.length ; i++)
    {
        if(accountants[i].email.toLowerCase() == email.toLowerCase() && accountants[i].password.toLowerCase() == password.toLowerCase())
        {
            localStorage.setItem("recordUsername" , accountants[i].name);
            location.href = "welcome.html"
        }
        else
        {
            document.getElementById("incorrect").innerHTML = `<p class="text-center text-danger">incorrect Email or Password</p>`;

        }
    }
}

function isLogInEmpty()
{
    if (signInPassword.value =="" || signInEmail.value == "")
    {
        return false;
    }
    else
    {
        return true;
    }
}

function logOut()
{
    localStorage.removeItem("userNameStored");
}
// function test()
// {
//     if (localStorage.getItem("accountantsLoged").userEmail.value == null && localStorage.getItem("accountantsLoged").userPass.value == null)
//     {
//         var requiredInput = `<p class="text-center text-danger">All inputs is required</p>`;
//         document.getElementById("reqInp").innerHTML = requiredInput;
//     }

//     else
//     {
     
//             var welcome = ``;

//             welcome = `<div class="container">
//                     <form class=" w-75  my-5 mx-auto py-3">
//                         <h1 class="text-center text-info pt-3">Hello + ${userName.value}</h1>
//                         </p>
//                     </form>
//                 </div>`;

//     }
//     document.getElementById("welcome").innerHTML = welcome ;
// }

                //Clear Data Entered

function clearform()
{
    signUpName.value="",
    signUpEmail.value="",
    signUpPassword.value=""
}