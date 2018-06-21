module.exports = {
    head:{
        link: [
            {
                rel: "stylesheet",
                href: "https://unpkg.com/vuetify/dist/vuetify.min.css"
            },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/icon?family=Material+Icons"
            },
            {
                rel: "icon",
                type: "image/png",
                href: "favicon.png"
            }
        ]
    },
    css:[
        "material-design-icons"
    ],
    plugins: ["@plugins/vuetify.js"],
    build: {
        vendor: ["vuetify"]
    }
}