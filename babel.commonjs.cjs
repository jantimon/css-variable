module.exports = {
    "presets": ["@babel/preset-typescript"],
    "plugins": [
        ["@babel/plugin-transform-modules-commonjs", {
          "allowTopLevelThis": false,
          "importInterop": "none"
        }]
    ]
}