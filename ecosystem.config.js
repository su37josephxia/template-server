module.exports = {
    server: [
        {
            name: "template-server",
            script: "./process.yml",
        },
    ],
    ssr: [
        {
            name: "builder-ssr",
            script: "../builder-ssr/process.yml",
        },
    ],
    ssg: [
        {
            name: "builder-ssg",
            script: "../builder/process.yml",
        },
    ],
};