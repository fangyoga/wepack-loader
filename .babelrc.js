module.exports = {
    "plugins": [
        ["@babel/plugin-transform-runtime"],
    ],
    "presets": [
        ["@babel/preset-env"],
        ["@babel/preset-typescript"],
        [
            "@babel/preset-react",
            {
                "runtime": "automatic" // 这行可以在写react的时候不需要导入react
            }
        ],
    ]
}