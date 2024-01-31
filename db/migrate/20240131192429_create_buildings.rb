class CreateBuildings < ActiveRecord::Migration[7.1]
  def change
    create_table :buildings do |t|
      t.references :city
      t.string :name

      t.timestamps
    end
  end
end
