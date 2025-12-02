terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 1.0"
    }
  }
}

provider "vercel" {
  # Set VERCEL_API_TOKEN environment variable
}

# Vercel Project
resource "vercel_project" "survival_game" {
  name      = "terraform-survivor-${var.environment}"
  framework = "other"

  git_repository = {
    type = "github"
    repo = var.github_repo # e.g., "username/terraform-survivor"
  }

  environment = [
    {
      key    = "GAME_ENVIRONMENT"
      value  = var.environment
      target = ["production", "preview"]
    },
    {
      key    = "GAME_DIFFICULTY"
      value  = var.difficulty
      target = ["production", "preview"]
    }
  ]
}

# Generate config.js based on environment
resource "local_file" "game_config" {
  filename = "${path.module}/../../frontend/config.js"
  content  = templatefile("${path.module}/config.js.tpl", {
    environment          = var.environment
    difficulty          = var.difficulty
    hunger_decay        = var.game_settings.hunger_decay_rate
    thirst_decay        = var.game_settings.thirst_decay_rate
    energy_decay        = var.game_settings.energy_decay_rate
    resource_multiplier = var.game_settings.resource_multiplier
    danger_level        = var.game_settings.danger_level
    crafting_enabled    = var.features.crafting_enabled
    weather_events      = var.features.weather_events
    random_events       = var.features.random_events
    starting_wood       = var.starting_resources.wood
    starting_stone      = var.starting_resources.stone
    starting_food       = var.starting_resources.food
    version             = var.version
  })
}

# Deployment
resource "vercel_deployment" "survival_game" {
  project_id = vercel_project.survival_game.id
  files      = {
    "index.html" = file("${path.module}/index.html")
    "style.css"  = file("${path.module}/style.css")
    "game.js"    = file("${path.module}/game.js")
    "config.js"  = local_file.game_config.content
  }
  production = var.environment == "production"
}
