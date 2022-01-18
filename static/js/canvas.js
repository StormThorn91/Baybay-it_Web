window.addEventListener('load', () => {
 const canvas = document.querySelector("#canvas");
 const ctx = canvas.getContext('2d');
 ctx.fillStyle = "white";
 ctx.fillRect(0, 0, canvas.width, canvas.height);

 const btnSave = document.querySelector("#save");

 //variables
 let painting = false;

 function startPosition(e) {
     painting = true;
     draw(e);
 }

 function finishedPosition() {
     painting = false;
     ctx.beginPath();
 }

 function draw(e) {
     if(!painting) {
         return;
     }

     ctx.lineWidth = 10;
     ctx.lineCap = "round";
     ctx.lineTo(e.clientX, e.clientY);
     ctx.stroke();
     ctx.beginPath();
     ctx.moveTo(e.clientX, e.clientY);

 }

    //Eventlisteners
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);

    btnSave.addEventListener('click', () => {
        const a = document.createElement('a');

        document.body.appendChild(a);
        a.href = canvas.toDataURL("image/jpeg");
        a.download = "canvas.jpg"
        a.click();
        document.body.removeChild(a);
    })


});