const getData = async (year, round) => {
    let response = await axios.get(`https://ergast.com/api/f1/${year}/${round}/driverstandings.json`)
    console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings)
    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
}
// Create a constant to hold DOM Elements
const DOM_Elements = {
    drivers: '.tableData'
}

// Create DriverList HTML
const createDriver = (position, fname, lname, sponsor, nationality, points) => {
        
    const html = `<tr><th scope="row">${position}</th>
                  <td>${fname} ${lname}</td>
                  <td>${sponsor}</td>
                  <td>${nationality}</td>
                  <td>${points}</td></tr>`
    
    // Paste list item on document
    document.querySelector(DOM_Elements.drivers).insertAdjacentHTML('beforeend', html)
}

// Create a Function to Loop Over Drivers and Create Each Element
const loadData = async (year, round) => {
    clearData()
    const driverList = await getData(year, round);
    
    driverList.forEach(driver => createDriver
    (driver.position, driver.Driver.givenName, driver.Driver.familyName, driver.Constructors[0].constructorId, driver.Driver.nationality, driver.points))

}

//Clear Data
const clearData = () => {
    document.querySelector(DOM_Elements.drivers).innerHTML = ''
};