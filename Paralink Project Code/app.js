//PARALINK * ICS4UR-A * JANUARY 07, 2017 * v1.0//

//**********************************//
//************ LOGIN ***************//
//**********************************//
function login() {

    //Get Elements
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');

    //Add login event
    btnLogin.addEventListener('click', e => {
        //Get email and password
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
    
        //Sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    //Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            console.log(firebaseUser);
            window.open("home.html","_self")
        } else {
            console.log('not logged in');
    }
    });
};

//**********************************//
//************ LOGOUT **************//
//**********************************//
//Logout Button in Main Nav
function logout() {
    //Get Elements
    const btnLogout = document.getElementById('btnLogout');
    
    //Logout Event
    btnLogout.addEventListener('click', e =>{
        firebase.auth().signOut();
        window.open("logout.html","_self");
});

    //Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            console.log(firebaseUser);
        } else {
            console.log('not logged in');
            window.open('login.html','_self');
        }
    });
};

//Logout Button in Side Nav
function logoutNav() {
    //Get Elements
    const btnLogoutNav = document.getElementById('btnLogoutNav');
    
    //Logout Event
    btnLogoutNav.addEventListener('click', e =>{
        firebase.auth().signOut();
        window.open("logout.html","_self");
    });
};

//**********************************//
//************ SIGNUP **************//
//**********************************//
function signUp() {
    //Get Elements
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnSignUp = document.getElementById('btnSignUp');

    //Add signup event
    btnSignUp.addEventListener('click', e => {
        //Get email and password
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        //Sign in
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });
    
    //Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            console.log(firebaseUser);
            window.open("profile_initial.html","_self");
        } else {
            console.log('not logged in');
        }
    });
}

//**********************************//
//************ SIDE NAV ************//
//**********************************//

// Set the width of the side navigation when opened
function openNav() {
    document.getElementById("mySidenav").style.width = "40vw";
};

// Set the width of the side navigation to 0 when closed
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
};
//**********************************//
//****** UPDATE USER PROFILE *******//
//**********************************//
function profileUpdate() {

    btnSubmit.addEventListener('click', e => {
    
        //Get Elements
        const txtName = document.getElementById('txtName');
        const txtProfilePicture = document.getElementById('txtProfilePicture');
        const txtAge = document.getElementById('txtAge');
        const txtGender = document.getElementById('txtGender');
        const txtLocation = document.getElementById('txtLocation');
        const btnSubmit = document.getElementById('btnSubmit');
        const user = firebase.auth().currentUser;
        const userID = firebase.auth().currentUser.uid;

            
            //Update Firebase Profile
            user.updateProfile({
                displayName: txtName.value,
                photoURL: txtProfilePicture.value,
            });
            //Save Data
            firebase.database().ref("user_data").child(userID).set({
                user: {
                    displayGender: txtGender.value,
                    displayLocation: txtLocation.value,
                    displayAge: txtAge.value,
                }
            });
            
            //Confirm
            confirm("Profile has been updated.");
            
            //Send to Home Page (Delay for Firebase to Sync)
            setTimeout(function() {window.open("profile_job_history.html","_self");}, 1000);
    });
};

//**********************************//
//******** GET USER PROFILE ********//
//**********************************//
function getProfile() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        //Get Name & Display It
        var name = user.displayName;
        document.getElementById("txtName").innerHTML = name;

      } else {
        // No user is signed in.
      }
    });
};

//**********************************//
//******* CREATE JOB LISTING *******//
//**********************************//
function createJob() {
    
    //Add Event Listener    
    btnSubmit.addEventListener('click', e => {
      
        //Get Elements
        const btnSubmit = document.getElementById('btnSubmit');
        const txtJobTitle = document.getElementById('jobTitle');
        const txtCompanyName = document.getElementById('companyName');
        const txtLocation = document.getElementById('location');
        const txtJobDescription = document.getElementById('jobDescription');
        const industry = document.getElementById('industry');
        const jobFunction = document.getElementById('jobFunction');
        const txtExperience = document.getElementById('txtExperience');
        const jobEmploymentType = document.getElementById('jobEmploymentType');
        
        if (txtJobTitle.value === "" || txtCompanyName.value === "" || txtLocation.value === "" || 
        txtJobDescription.value === "" || industry.value === "null" || jobFunction.value === "null" || 
        txtExperience === "" || jobEmploymentType === "null") {
            
                //Confirm if Everything is Filled Out
                confirm("Please fill out every box.");
        } else {
            //Save Data
                    firebase.database().ref().child("Job_Listings").push({
                            job_title: txtJobTitle.value,
                            company_name: txtCompanyName.value,
                            company_industry: industry.value,
                            location: txtLocation.value,
                            job_description: txtJobDescription.value,
                            job_posted_by: firebase.auth().currentUser.displayName,
                            experience: "Experience: " + txtExperience.value,
                            job_employment_type: jobEmploymentType.value,
                            job_function: jobFunction.value,
                    });
                    
            //Confirm
            confirm("Job has been listed.");
            
            //Send to Home Page (Delay for Firebase to Sync)
            setTimeout(function() {window.open("home.html","_self");}, 1000);
            }
    });
};

//**********************************//
//******* UPDATE JOB HISTORY *******//
//**********************************//
function jobHistory() {
    
    btnSubmit.addEventListener('click', e => {
        //Get Elements
        const txtCurrentJobTitle = document.getElementById('txtCurrentJobTitle');
        const txtCurrentCompanyName = document.getElementById('txtCurrentCompanyName');
        const txtCurrentJobStartDate = document.getElementById('txtCurrentJobStartDate');
        const txtCurrentJobResponsibilities = document.getElementById('txtCurrentJobResponsibilities');
        const btnSubmit = document.getElementById('btnSubmit');
        const userID = firebase.auth().currentUser.uid;
        
        //Save Data
        firebase.database().ref("user_data/" + userID).child("job_experience").set({
            current_job: {
                job_title: txtCurrentJobTitle.value,
                company_name: txtCurrentCompanyName.value,
                start_date: txtCurrentJobStartDate.value,
                end_date: "null",
                job_description: txtCurrentJobResponsibilities.value,
            }
        });
        
        //Confirm
        confirm("Current Job has been set.");
            
        //Send to Home Page (Delay for Firebase to Sync)
        setTimeout(function() {window.open("home.html","_self");}, 1000);
    });
};

//**********************************//
//******* UPDATE JOB HISTORY *******//
//**********************************//
function perviousJob() {
    
    btnSubmit.addEventListener('click', e => {
        //Get Elements
        const txtJobTitle = document.getElementById('txtCurrentJobTitle');
        const txtCompanyName = document.getElementById('txtCurrentCompanyName');
        const txtJobStartDate = document.getElementById('txtCurrentJobStartDate');
        const txtJobEndDate = document.getElementById('txtCurrentJobEndDate');
        const txtJobResponsibilities = document.getElementById('txtCurrentJobResponsibilities');
        const btnSubmit = document.getElementById('btnSubmit');
        const userID = firebase.auth().currentUser.uid;
        
        //Save Data
        firebase.database().ref("user_data/" + userID).child("job_experience/pervious_job").push({
            job_title: txtJobTitle.value,
            company_name: txtCompanyName.value,
            start_date: txtJobStartDate.value,
            end_date: txtJobEndDate.value,
            job_description: txtJobResponsibilities.value,
        });
        
        //Confirm
        confirm("Pervious Job has been added.");
            
        //Send to Home Page (Delay for Firebase to Sync)
        setTimeout(function() {window.open("home.html","_self");}, 1000);
    });
};

//**********************************//
//*********** JOB CARDS ************//
//**********************************//
function listJobs() {
    
    var temp;
    var filterString;
    var i;
    
    temp = localStorage.getItem('Filter');
    filterString = JSON.parse(temp);
    console.log (filterString);
    
    //Get All Listings from Firebase
    firebase.database().ref().child("Job_Listings").on("value", function(snapshot){
        //Convert Object to Array
        const array = $.map(snapshot.val(), function(value, index) {
            return [value];
        });
    console.log(array);
            
    //Show "There are not job postings at the moment." If No Job Posts
    if (array == null) {
        document.getElementById("noPosts").style.visibility = "visible";
    
    } else {
        //Loops & Creates Cards for All Applicable Posts
        for (i = 0; i <= array.length; i++) {
            if ((array[i].company_name == filterString[0].companyName || filterString[0].companyName === "null") && 
            (array[i].company_industry == filterString[0].industry || filterString[0].industry === "null") && 
            (array[i].job_employment_type == filterString[0].jobEmploymentType || filterString[0].jobEmploymentType === "null") &&
            (array[i].job_function == filterString[0].jobFunction || filterString[0].jobFunction === "null") &&
            (array[i].location == filterString[0].location || filterString.location === "null")) {
                //Get Title & Display It
                const jobTitle = document.createElement("div");
                jobTitle.innerHTML = array[i].job_title;
                jobTitle.className = "card jobTitle";
                document.getElementById("jobPosts").appendChild(jobTitle);
                
                //Get Company Name & Display It
                const companyName = document.createElement("p");
                companyName.innerHTML = array[i].company_name;
                companyName.className = "card companyName";
                document.getElementById("jobPosts").appendChild(companyName);
                
                //Get Location & Display It
                const location = document.createElement("p");
                location.innerHTML = array[i].location;
                location.className = "card location";
                document.getElementById("jobPosts").appendChild(location);
                
                //Get Company Industry & Display It
                const companyIndustry = document.createElement("p");
                companyIndustry.innerHTML = array[i].company_industry;
                companyIndustry.className = "card companyIndustry";
                document.getElementById("jobPosts").appendChild(companyIndustry);
                
                //Get Job Function & Display It
                const jobFunction = document.createElement("p");
                jobFunction.innerHTML = array[i].job_function;
                jobFunction.className = "card jobFunction";
                document.getElementById("jobPosts").appendChild(jobFunction);
                
                //Get Job Employment Type & Display It
                const jobEmploymentType = document.createElement("p");
                jobEmploymentType.innerHTML = array[i].job_employment_type;
                jobEmploymentType.className = "card jobEmploymentType";
                document.getElementById("jobPosts").appendChild(jobEmploymentType);
                
                //Get Job Experience & Display It
                const jobExperience = document.createElement("p");
                jobExperience.innerHTML = array[i].experience;
                jobExperience.className = "card jobExperience";
                document.getElementById("jobPosts").appendChild(jobExperience);
                
                //Get Job Description & Display It
                const jobDescription = document.createElement("p");
                jobDescription.innerHTML = array[i].job_description;
                jobDescription.className = "card jobDescription";
                document.getElementById("jobPosts").appendChild(jobDescription);
            };
        };
    };
    });
};