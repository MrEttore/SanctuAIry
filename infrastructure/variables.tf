## GLOBAL VARIABLES ##

variable "project_id" {
  description = "The GCP project to deploy into"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
  default     = "europe-west4"
}

variable "zone" {
  description = "GCP zone"
  type        = string
  default     = "europe-west4-a"
}

variable "network" {
  description = "Name of the VPC network to attach to"
  type        = string
  default     = "default"
}

## COMPUTE VARIABLES ##

variable "instance_tags"   {
  type = list(string)
  default = ["allow-attestation"]
}

## FIREWALL VARIABLES ##

variable "firewall_name" {
  description = "Name of the firewall rule"
  type        = string
}

variable "target_tags" {
  description = "Target tags for the firewall rule"
  type        = list(string)
  default     = ["allow-attestation"]
}


