terraform {
  required_version = ">= 1.2"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 4.0"
    }
  }

  # backend "gcs" {
  #   bucket = "my-tf-state-bucket"
  #   prefix = "sanctuairy/"
  # }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# module "firewall" {
#   source        = "./modules/firewall"
#   name          = var.firewall_name
#   network       = var.network
#   target_tags   = var.target_tags
# }

# Reference TEE instance
module "reference_tee" {
  source         = "./modules/compute"
  instance_name  = "reference-tee-2"
  boot_disk_name = "reference-tee-boot-disk"
  zone           = var.zone
  network        = var.network
  tags           = var.instance_tags
}

# Take a live snapshot of its boot disk
resource "google_compute_snapshot" "reference_tee_boot_disk_snapshot" {
  name             = "reference-tee-boot-disk-snapshot"
  source_disk      = "zones/${var.zone}/disks/${module.reference_tee.confidential_instance_name}"
}

# Snapshot “golden” boot disk image from the reference TEE instance
resource "google_compute_image" "golden_reference_tee" {
  name            = "golden-reference-tee-boot-disk"
  project         = var.project_id
  source_snapshot = google_compute_snapshot.reference_tee_boot_disk_snapshot.id
}

# Prod‐TEE VM based on the golden image
module "prod_tee" {
  source               = "./modules/compute"
  instance_name        = "llm-core-prod-tee"
  boot_disk_name       = "prod-tee-boot-disk"
  zone                 = var.zone
  network              = var.network
  tags                 = var.instance_tags
  image                = google_compute_image.golden_reference_tee.name
  depends_on           = [ google_compute_image.golden_reference_tee ]
}
