output "deployment_url" {
  description = "URL of the deployed game"
  value       = vercel_deployment.survival_game.url
}

output "project_id" {
  description = "Vercel project ID"
  value       = vercel_project.survival_game.id
}

output "environment" {
  description = "Deployed environment"
  value       = var.environment
}

output "game_config" {
  description = "Current game configuration"
  value = {
    difficulty          = var.difficulty
    hunger_decay        = var.game_settings.hunger_decay_rate
    thirst_decay        = var.game_settings.thirst_decay_rate
    danger_level        = var.game_settings.danger_level
    crafting_enabled    = var.features.crafting_enabled
  }
}
