module.exports = {
    server: [
        {
            name: "template-server",
            config_file: "./process.yml",
        },
    ],
    ssr: [
        {
            name: "builder-ssr",
            config_file: "../builder-ssr/process.yml",
        },
    ],
    ssg: [
        {
            name: "builder-ssg",
            config_file: "../builder/process.yml",
        },
    ],
};