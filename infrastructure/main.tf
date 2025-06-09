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

module "firewall" {
  source        = "./modules/firewall"
  name          = var.firewall_name
  network       = var.network
  target_tags   = var.target_tags
}

module "compute" {
  source        = "./modules/compute"
  name          = var.instance_name
  machine_type  = var.machine_type
  zone          = var.zone
  network       = var.network
  tags          = var.instance_tags
}
