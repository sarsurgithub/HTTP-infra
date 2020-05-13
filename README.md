# HTTP Infrastructure Lab Doc for Grandmas

## Step 2: Dynamic HTTP server with express.js

#### Goals

- Create a Docker image based on the official node image
- Write an HTTP app in node.js which returns a json payload on Get requests
- Build our image and run containers

### Create a Docker image based on the node official image, write the app and run it 

As for the first step we took the node image as a base and then wrote our Dockerfile as :

``` 
FROM node:12.16

COPY src /opt/app

CMD ["node", "/opt/app/index.js"] ```
```

The first line tells docker to use the official docker image as a base. The second one copies our src directory into `/opt/app`in the image. The last on tells docker to run the commands `node` and `/opt/app/index.js`when we run the image. 

Now our directory look like this: 

![step2-tree](./pics/step2-tree.png)

​																		*image 3: directory tree*

The next step was to write a little which returns a json payload. We chose to use [chance.js](https://chancejs.com/) to generate a poem. The json payload contains the title, the rimes and the content of the poem. The index.js file is placed in the src directory so that it will be copied into our image, as explained before.

![json-payload](./pics/json-payload.png)

​		*image 4: json payload*

We now have everything setup to run our project.

### Simple steps to run this part of the project with docker desktop 

1. Place yourself in the `express-image`directory

2. build the docker image 

   ​	` docker build -t res/express_students .` 

   Where 

   - `docker build` tells docker to build an image
   - `-t` to do it in the background 
   - `res/express_students` is the name we chose for our image
   - `.` tells docker to look for the `src` directory from our current directory

3. Run the docker image 

   `docker run -p 9090:3000 res/express_students`

   Where 

   - `-p 9090:3000` tells docker to do a port mapping, meaning that the container's port 3000 is linked to our localhost port 9090
   - `res/express_students` is the name of the image we want to run

4. View the beautiful json payload

   - open your favorite browser 
   - You can see the json on `localhost:9090` 











