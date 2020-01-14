resource "google_storage_bucket" "yadev_site" {
    name = "${google_storage_bucket.yadev_site}"
    location = "US"
}
