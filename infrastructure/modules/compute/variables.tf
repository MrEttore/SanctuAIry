variable "name" {
  description = "Name of the VM"
  type        = string
  default     = "reference-tee"
}

variable "zone" {
  description = "Zone to deploy the VM"
  type        = string
}

variable "machine_type" {
  description = "GCP VM machine type"
  type        = string
  default     = "c3-standard-4"
}

variable "network" {
  description = "Name of the VPC network to attach to"
  type        = string
}

variable "tags" {
  description = "Network tags for firewall rules"
  type        = list(string)
  default     = []
}

variable "metadata_startup_script" {
  description = "Startup script to run on VM creation"
  type        = string
  default     = ""
}
