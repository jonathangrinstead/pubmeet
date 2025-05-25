class CreateMeets < ActiveRecord::Migration[8.0]
  def change
    create_table :meets do |t|
      t.datetime :decision_deadline
      t.string :slug

      t.timestamps
    end
    add_index :meets, :slug, unique: true
  end
end
