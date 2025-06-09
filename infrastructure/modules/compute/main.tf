resource "google_compute_instance" "vm" {
  name         = var.name
  machine_type = var.machine_type
  zone         = var.zone

  boot_disk {
    initialize_params {
      image = "ubuntu-2204-jammy-v20250508"
      type  = "pd-balanced"
      size  = 30
    }
  }

  network_interface {
    network       = var.network
    access_config {}
  }

  tags = var.tags

  # Optional: Add a startup script (e.g., install Docker or pull your container)
  metadata_startup_script = <<-EOT
    #!/bin/bash
    apt update && apt install -y docker.io
  EOT
}
