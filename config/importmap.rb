# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin "trix"
pin "@rails/actiontext", to: "actiontext.esm.js"
pin "@notus.sh/cocooned", to: "@notus.sh--cocooned.js" # @2.4.0
pin_all_from "app/javascript/controllers", under: "controllers"
