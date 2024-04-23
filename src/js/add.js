"use strict"
const url = "https://mongodb-api.up.railway.app/workexperiences/" //API url
const addBtn = document.getElementById("add");
//Event listener för lägg till knappen
addBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    const company = document.getElementById("coName");
    const jobTitle = document.getElementById("title");
    const jobLocation = document.getElementById("location");
    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("slutDatum");
    // Läser in form data
    let companyname = company.value;
    let jobtitle = jobTitle.value;
    let location = jobLocation.value;
    let startdate = startDate.value;
    let enddate = endDate.value;
    
    if(companyname && jobtitle && location && startdate){
        postData(companyname, jobtitle, location, startdate, enddate);
        //Töm formulär
        company.value = "";
        jobTitle.value = "";
        jobLocation.value = "";
        startDate.value = "";
        endDate.value = "";
    }else{
        document.getElementById("printed").textContent = "Alla fält markerade med '*' måste fyllas i"
    }
});

// POST request, för att lagra data i db
async function postData(companyname, jobtitle, location, startdate, enddate){

    let exp = {
        companyname: companyname,
        jobtitle: jobtitle,
        location: location,
        startdate: startdate,
        enddate: enddate
    }

    let error;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exp)
        });
        
    } catch (err) {
        error = err;
        console.error('Fetch error:', error);
        document.getElementById("postErr").textContent = "Det gick inte att lägga till pga: " + error.message;
    }finally{
        if(!error){
            document.getElementById("printed").textContent = "En arbetserfarenhet har laggts till och kan synas på startsidan"
        }
    }
}