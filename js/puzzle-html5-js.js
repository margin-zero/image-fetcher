// global variables

var puzzleArray = ["puzzle001.jpg","puzzle002.jpg"],
    puzzleDirectory = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')) +"/puzzles/";
    puzzlePath = new String;


    alert(puzzleDirectory);

    $(document).ready(puzzleRun);


    function puzzleRun() {
        
        var i;

        // add puzzle thumbnails into thumbnail container
        for (i=0; i<puzzleArray.length;i++) {
            $("#puzzleContainer>.puzzles").append("<img src='" + puzzleDirectory + puzzleArray[i] + "' class='puzzleThumbnail' alt='puzzle preview' />");
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
            context.drawImage(img, 0, 0);
        };

        puzzlePath = puzzleDirectory + puzzleArray[$this.index()-1];

        img.src = puzzlePath;

        $("#puzzleContainer").hide();
    }

    
    function puzzleNewClick() {
        $("#puzzleContainer").show();
    }
