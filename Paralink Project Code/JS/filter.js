//PARALINK * ICS4UR-A * JANUARY 11, 2017 * v1.0//

//Retrieve Jobs from Firebase
function getOptions() {
    firebase.database().ref().child("Job_Listings").on("value", function(snapshot){
    //Convert Object to Array
        const array = $.map(snapshot.val(), function(value, index) {
            return [value];
        });
    console.log(array);
    
        for (i = 0; i <= array.length; i++) {
                
            //Get Company Name & Display It
            const companyName = document.createElement("option");
            companyName.innerHTML = array[i].company_name;
            companyName.className = "card companyName";
            document.getElementById("companyName").appendChild(companyName);
        };
    });
};

//Store to Local Storage
function storeOptions() {
    const catagory = [];
    const index = 0;
    const btnSubmit = document.getElementById("btnSubmit");
    
    btnSubmit.addEventListener ('click', e => {
        catagory[index] = {
            industry: $("#industry").val(),
            companyName: $("#companyName").val(),
            jobEmploymentType: $("#jobEmploymentType").val(),
            jobFunction: $("#jobFunction").val(),
            location: $("#location").val(),
        };
        const categoryFilter = JSON.stringify(catagory);
        console.log(categoryFilter);
        
        localStorage.setItem('Filter', categoryFilter);
    });
};