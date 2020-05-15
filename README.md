# HTTP Infrastructure Lab Doc for Grandmas

## Step 4: AJAX requests with JQuery

#### Goals

- modify our web page so that it is dynamically updates every few seconds

### Create the ajax request 

In our `apache_php_image>content>js` directory we create a new file `students.js`  :

``` 
$(function() {
    console.log('Loading the best poem you will ever see')
    $(".mb-5").after(`<div id='poem'></div>`)
    function loadPoem() {
        $.getJSON( "/api/students/", function (resp){
            console.log(resp.poem)
            $("#poem").html(resp.poem)
        })
    }
    loadPoem()
    setInterval(loadPoem, 7000)
})
```

This function makes GET requests to our /api/students/ endpoint every 7 seconds and inserts the text payload into the DOM of our web page.  For that to work we need to add the script into our `index.html` file and also add jquery : 

``` 
 <script src="js/students.js"></script>

 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
```

 We are now setup to run our project.

### Simple steps to run this part of the project with docker desktop 

1. Build the apache_php image : 
   
` docker build -t res/apache_php .` 
   
Where 
   
   - `docker build` tells docker to build an image
   - `-t` to do it in the background 
   - `res/apache_php` is the name we chose for our image
   - `.` tells docker to look for the `content` directory from our current directory
   
2. Run our three containers in the right order :
   `docker run -d --name apache_static res/apache_php` 

   `docker run -d --name express_dynamic res/express_students`

   `docker run -p 8080:80 res/apache_rp`

3. Now open your browser and go to `demo.res.ch:8080`.

   You sould see our dynamically updated web page.

4. With the developper tools we can inspect the request done on `demo.res.ch:8080/api/students` 
