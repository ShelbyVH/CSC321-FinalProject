#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::Manager;
use tauri_plugin_stronghold::TauriStronghold;

// Create the command:
#[tauri::command]
fn close_splashscreen(window: tauri::Window) {
  // Close splashscreen
  if let Some(splashscreen) = window.get_window("splashscreen") {
    splashscreen.close().unwrap();
  }
  // Show main window
  window.get_window("main").unwrap().show().unwrap();
}

// Register the command:
fn main() {
  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![close_splashscreen])
      .plugin(TauriStronghold::default())
      .run(tauri::generate_context!())
      .expect("failed to run app");
}