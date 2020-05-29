# HTTP Infrastructure Lab Doc for Grandmas

## Step 5: Dynamic reverse proxy configuration

#### Goals

- modify our reverse proxy so that the ip adresses can be stored into variables

### Create a php config file 

In our `apache_reverse_proxy/templates` directory we create a new file `config-template.php`  :

``` 
<?php 

$DYNAMIC_APP = getenv('DYNAMIC_APP');
$STATIC_APP = getenv('STATIC_APP');

?>
<VirtualHost *:80>
    Servername demo.res.ch

    ProxyPass '/api/students/' 'http://<?php print "$DYNAMIC_APP" ?>/'
    ProxyPassReverse '/api/students/' 'http://<?php print "$DYNAMIC_APP" ?>/'

    ProxyPass '/' 'http://<?php print "$STATIC_APP" ?>/'
    ProxyPassReverse '/' 'http://<?php print "$STATIC_APP" ?>/'

</VirtualHost>
```

By doing this we tell our file to register our environement variables (ip adresses in our case) into DYNAMIC_APP and STATIC_APP variables. We also rewrite our 001-reverse-proxy.conf file with the variables so that when we run our container the file will be replaced by this one, with the correct variables.

### Create an apache2-foreground exec

This a file existing in the official docker image, so we'll want to copy and past its original content and add a line to put the result of our php-config file into the 001-reverse-proxy.conf file we were talking about in the previous step. This is the line we need to add : 

``` 
php /var/apache2/templates/config-template.php > /etc/apache2/sites-available/001-reverse-proxy.conf
```

Once this is done we to run a chmod command to make this file excutable : 

``` 
chmod 755 apache2-foreground
```

### Modify our Dockerfile

 The docker file will now look like this :

``` 
 FROM php:7.2-apache

RUN apt-get update && \
    apt-get install -y vim 	//install vim in the container 

COPY apache2-foreground /usr/local/bin  //copy the apache2-foreground file we created to replace the one already in the image

COPY templates /var/apache2/templates // copy our php config file into a new directory in the image

COPY conf/ /etc/apache2 // copy our sites-available directory in the image

RUN a2enmod proxy proxy_http 
RUN a2ensite  000-* 001-* //run these 2 commands 
```

 We are now setup to run our project.

### Simple steps to run this part of the project with docker desktop 

1. Build the apache_rp image : 
   

` docker build -t res/apache_rp .` 

Where 

   - `docker build` tells docker to build an image
   - `-t` to do it in the background 
   - `res/apache_rp` is the name we chose for our image
   - `.` tells docker to look for the `content` directory from our current directory

2. We can now run our other two containers (the order can be random, that's the goal of the step) :
   `docker run -d --name apache_static res/apache_php` 

   `docker run -d --name express_dynamic res/express_students`

3. Find the ip adresses of our containers: 

    `docker inspect express_dynamic  | grep -i ipaddress`

   `docker inspect apache_static  | grep -i ipaddress` 

4. Run our apache_rp container with the env. variables :

   `docker run -d -e STATIC_APP=172.17.0.5:80 -e DYNAMIC_APP=172.17.0.8:3000 --name apache_rp -p 8080:80 res/apache_rp`

   Where 

   - `-d` so that the container starts in the background
   - `-e STATIC_APP=172.17.0.5:80 -e DYNAMIC_APP=172.17.0.8:3000` are the env variables that we found using docker inspect
   - `--name apache_rp`is the name we want to give to our container
   - `-p 8080:80`maps the port 8080 of our computer to the port 80 of the container
   - `res/apache_rp`is the name of the image we want to run.

5. Now open your browser and go to `demo.res.ch:8080`.

   You should see our dynamically updated web page.

   
