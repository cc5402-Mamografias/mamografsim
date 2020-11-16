var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
    
function showTab(n) {
    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("pasos-lista");
    x[n].style.display = "block";
    //... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("prevBtn").style.position = "relative";
    } else {
        document.getElementById("nextBtn").style.display = "inline";
        document.getElementById("prevBtn").style.position = "absolute";
    }
    document.getElementById("nextBtn").blur();
    document.getElementById("prevBtn").blur();
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("pasos-lista");
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form...
    showTab(currentTab);
}