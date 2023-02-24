//Scripts for the whole web app

var modal = document.getElementById("modal");

const showModal = () => {
  modal.style.display = "block";
}

const closeModal = () => {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

window.addEventListener('load', () => {
 const canvas = document.querySelector("#canvas");
 const btnClear = document.querySelector("#clear");
 const ctx = canvas.getContext('2d');
 ctx.fillStyle = "white";
 ctx.fillRect(0, 0, canvas.width, canvas.height);

 //variables
 let coord = {x: 0, y:0}
 let painting = false;

 function getPosition(e) {
     coord.x = e.clientX - canvas.offsetLeft;
     coord.y = e.clientY - canvas.offsetTop;
 }

 function startPosition(e) {
     painting = true;
     draw(e);
 }

 function finishedPosition() {
     painting = false;
     ctx.beginPath();
     let base64 = canvas.toDataURL("image/jpeg");
     console.log(base64)
     const strURI = document.getElementById('uri-str').value = base64.substring(23);
 }

 function draw(e) {
     if(!painting) {
         return;
     }

     ctx.lineWidth = 10;
     ctx.lineCap = "round";
     ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
     ctx.stroke();
     ctx.beginPath();
     ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);

 }

    //Eventlisteners
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);
    //touchscreen eventlisteners
    canvas.addEventListener('touchstart', function(e) {
        this.down = true;   
        this.X = e.touches[0].pageX ;
        this.Y = e.touches[0].pageY ;
        e.preventDefault();
      }, 0);

    canvas.addEventListener('touchend', function() {
        this.down = false;    
        ctx.beginPath();
        let base64 = canvas.toDataURL("image/jpeg");
        console.log(base64)
        const strURI = document.getElementById('uri-str').value = base64.substring(23);      
      }, 0);

    canvas.addEventListener('touchmove', function(e) {
        if(this.down) {
          with(ctx) {
            beginPath();
            moveTo(this.X, this.Y);
            lineTo(e.touches[0].pageX, e.touches[0].pageY);
            ctx.lineWidth=10;
            stroke();
          }
          this.X = e.touches[0].pageX;
          this.Y = e.touches[0].pageY;
          e.preventDefault();
        }
      }, 0);

    btnClear.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    })

});