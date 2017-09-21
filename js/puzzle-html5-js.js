// global variables

var puzzleArray = ["puzzle001.jpg","puzzle002.jpg","puzzle003.jpg"],
    puzzleDirectory = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')) +"/puzzles/";
    puzzlePath = new String;


    $(document).ready(puzzleRun);



    // Functions =============================================

    function puzzleRun() {
        
        var i;

        // add puzzle thumbnails into .puzzleContainer
        for (i=0; i<puzzleArray.length;i++) {
            $("#puzzleContainer>.puzzles").append("<div class='puzzleThumbnail'></div>");
            $("#puzzleContainer>.puzzles>div").eq(i).css("background-size","cover").css("background-image","url('" + puzzleDirectory + puzzleArray[i] +"')");
        };



        // assign event functions

        $(".puzzleThumbnail").click(function() { puzzleThumbnailClick($(this))});

        $("#controlNewPuzzle").click(puzzleNewClick);

    }




    // EVENT FUNCTIONS ====================================

    function puzzleThumbnailClick($this) {

        // var canvas = document.getElementById("temporaryImage"),
        var canvas = document.createElement("canvas"),
            context = canvas.getContext("2d"),
            img = new Image,
            i,x,y,newCanvas,newContext;

            $(canvas).prop({width: 800, height: 600});

        img.onload = function() {
            let imgW = img.naturalWidth,
                imgH = img.naturalHeight,
                imgOriginX, imgOriginY, imgWidth, imgHeight;

            if ((imgW/imgH)<(4/3)) {
                imgOriginX = 0;
                imgOriginY = parseInt(((imgH-(imgW*0.75))/2),10);
                imgWidth = imgW;
                imgHeight = parseInt((imgW*0.75),10);
            } else {
                imgOriginY = 0;
                imgOriginX = parseInt(((imgW - (imgH*(4/3))) / 2),10);
                imgHeight = imgH;
                imgWidth = parseInt((imgH*(4/3)),10);
            };
            
            
            // drawing scaled and fitted image onto canvas element
            context.drawImage(img, imgOriginX, imgOriginY, imgWidth, imgHeight, 0, 0, 800, 600);

            
            // creating empty elements of final image
            $("#finalImage").empty();
            for (i=1; i<=48;i++) {
                $("#finalImage").append("<div></div>");
            };

            // assign event functions to elements of image
            $("#finalImage>div").on("dragover", function(event) {
                finalImageAllowDrop(event);
            });
            $("#finalImage>div").on("drop", function(event) {
                finalImageDrop(event);
            });


            // creating scrambled elements - canvases
            $("#scrambledElements").empty();

            $("#scrambledElements").on("dragover", function(event) {
                scrambledElementsAllowDrop(event);
            });
            $("#scrambledElements").on("drop", function(event) {
                scrambledElementsDrop(event);
            });
            
            for (x=0;x<=7;x++) {
                for (y=0;y<=5;y++) {
                    newCanvas = document.createElement("canvas");
                    newContext = newCanvas.getContext("2d");
                    $(newCanvas).prop({width: 100, height: 100, draggable: true,id: "element"+((y*8)+x)});
                    newContext.drawImage(canvas,(x*100),(y*100),100,100,0,0,100,100);
                    $("#scrambledElements").append(newCanvas);

                    // assign event functions to new elements
                    $(newCanvas).on("dragstart", function(event) {
                        elementDrag(event);
                    });
                };
            };

            // scrambling elements
            for (i=0; i<=50; i++) {
                $("#scrambledElements").append($("#scrambledElements>canvas").eq(randomNumber(0,47)));
            };
        };



        puzzlePath = puzzleDirectory + puzzleArray[$this.index()-1];

        img.src = puzzlePath;

        $("#puzzleContainer").hide();
    }

    
    function puzzleNewClick() {
        $("#puzzleContainer").show();
    }

    function elementDrag(event) {
        event.originalEvent.dataTransfer.setData("text", event.target.id);
    }

    function finalImageAllowDrop(event) {
        if ($(event.target).is("div")) {event.preventDefault()};
    }


    function finalImageDrop(event) {
        event.preventDefault();
        var data = event.originalEvent.dataTransfer.getData("text");
        event.target.appendChild(document.getElementById(data));
    }

    function scrambledElementsAllowDrop(event) {
        if ($(event.target).is("div")) {event.preventDefault()};
    }


    function scrambledElementsDrop(event) {
        event.preventDefault();
        var data = event.originalEvent.dataTransfer.getData("text");
        event.target.appendChild(document.getElementById(data));
    }



    // generic functions

    function randomNumber(start, end) {
        return Math.floor(Math.random() * (end - start + 1) + start);
    }