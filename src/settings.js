const ENV = process.env.NODE_ENV || "nonprod"
const Settings = {}

const backendUrl = {
    development: "http://127.0.0.1:8000",
    prod: ""
}

const facebookAccountId = {
    development: "741130979689938",
    prod: ""
}

const githubAccountId = {
    development: "Iv1.b47720c18cd81698",
    prod: ""
}

Settings.backendUrl = backendUrl[ENV]
Settings.githubAccountId = githubAccountId[ENV]
Settings.facebookAccountId = facebookAccountId[ENV]

export default Settings;