// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

import Cocooned from "@notus.sh/cocooned";

document.addEventListener("turbo:load", () => {
  Cocooned.start();
});
