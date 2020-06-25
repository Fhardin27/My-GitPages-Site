window.onload = function () {
    window.addEventListener("resize", updateWindow);

    function updateWindow() {
        if (window.innerWidth < 1400) {
            console.log("Smaller/Mobile View.\n");
        }
        else {
            console.log("Larger View. \n");
        }
    }
}