const ENV = process.env.NODE_ENV || "nonprod"
const Settings = {}

const hostBase = {
    development: "http://localhost:3000"
}
const backendUrl = {
    development: "http://localhost:8000",
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

Settings.authRedirect = "/"
Settings.hostBase = hostBase[ENV]
Settings.backendUrl = backendUrl[ENV]
Settings.githubAccountId = githubAccountId[ENV]
Settings.facebookAccountId = facebookAccountId[ENV]

export default Settings;