export default `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EPUB.js</title>

  <script id="epubjs"></script>

  <style type="text/css">
      body {
        margin: 0;
      }

      #viewer {
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    </style>
</head>
<body>
  <div id="viewer"></div>
  
  <script>
    const currentSectionIndex = 1;
    // Load the opf
    const book = ePub("https://s3.amazonaws.com/epubjs/books/moby-dick/OPS/package.opf");
    const rendition = book.renderTo("viewer", {
        manager: "continuous",
        flow: "scrolled",
        width: "100%"
      });
    const displayed = rendition.display("epubcfi(/6/14[xchapter_001]!4/2/24/2[c001p0011]/1:799)");

    displayed.then(function(renderer){
      // -- do stuff
    });

    // Navigation loaded
    book.loaded.navigation.then(function(toc){
      
    });

  </script>

</body>
</html>
`;
