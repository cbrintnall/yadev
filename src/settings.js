const VERSION = "0.5.0";
const ENV = "prod"
const Settings = {}

const hostBase = {
    development: "http://localhost:3000",
    prod: "https://yadev.app"
}

const backendUrl = {
    development: "http://localhost:8000",
    prod: "https://us-central1-yadev-265117.cloudfunctions.net/yadev"
}

const googleAccountId = {
    development: "233929357765-93jkecls2jnoq7dnhfpj62q44q3f05gt.apps.googleusercontent.com",
    prod: "388579103128-hojvqefhssf01164h51v5vvfecit4vlc.apps.googleusercontent.com"
}

const githubAccountId = {
    development: "Iv1.b47720c18cd81698",
    prod: "Iv1.eeb78cf56c62c9a3"
}

Settings.trelloBoard = "https://trello.com/b/IpnWRlgS/yadev"
Settings.improvementForm = "https://forms.gle/raHis8J6jYfyHQtb7"
Settings.source = "https://github.com/cbrintnall/yadev"
Settings.githubIssues = `${Settings.source}/issues`
Settings.VERSION = VERSION
Settings.postEndpoint = "/post"
Settings.authRedirect = "/"
Settings.googleAccountId = googleAccountId[ENV]
Settings.hostBase = hostBase[ENV]
Settings.backendUrl = backendUrl[ENV]
Settings.githubAccountId = githubAccountId[ENV]

export default Settings;
