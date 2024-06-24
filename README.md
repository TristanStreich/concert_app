# Concert App

Simple app for tracking concerts I've been to. Currently it is deployed to [concerts.ferris.place](https://concerts.ferris.place)




## Developing

### Prerequisites

Node.js is required to run this. Installation instructions can be found [here](https://nodejs.org/en/download/prebuilt-installer)

### Running the Server

In your terminal run:

```shell
git clone https://github.com/TristanStreich/concert_app.git
cd concert_app
npm i
npm run dev
```

Now you should be able to access the site by going to http://localhost:2424



While the `npm run dev` command is active, any time you make changes to the code it will automatically redeploy the server with your changes. You may see the site go down temporarily during that turn over.


### Making Changes to the Frontend


The entrypoint for the website is at [`frontend/src/App.tsx`](https://github.com/TristanStreich/concert_app/blob/main/frontend/src/App.tsx) with other relevent code being in [`frontend/src/components/`](https://github.com/TristanStreich/concert_app/tree/main/frontend/src/components)