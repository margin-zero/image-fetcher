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

        var canvas = document.getElementById("temporaryImage"),
            context = canvas.getContext("2d"),
            img = new Image;

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
            context.drawImage(img, imgOriginX, imgOriginY, imgWidth, imgHeight, 0, 0, 800, 600);
        };

        puzzlePath = puzzleDirectory + puzzleArray[$this.index()-1];

        img.src = puzzlePath;

        $("#puzzleContainer").hide();
    }

    
    function puzzleNewClick() {
        $("#puzzleContainer").show();
    }
